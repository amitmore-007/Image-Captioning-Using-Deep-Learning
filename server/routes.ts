import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import { storage } from "./storage";
import { HfInference } from "@huggingface/inference";
import { uploadSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.HUGGINGFACE_TOKEN) {
  throw new Error("HUGGINGFACE_TOKEN must be set");
}

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
const upload = multer({ 
  limits: { 
    fileSize: 3 * 1024 * 1024, // 3MB
    files: 10 
  }
});

export function registerRoutes(app: Express) {
  app.post("/api/images", upload.array("files", 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Validate the uploaded files using the schema
      const parseResult = uploadSchema.safeParse({ files });

      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid upload",
          errors: parseResult.error.errors.map(err => ({
            message: err.message,
            path: err.path.join('.')
          }))
        });
      }

      const results = await Promise.all(files.map(async (file) => {
        try {
          // Convert buffer to base64 for storage
          const base64Data = file.buffer.toString('base64');

          // Generate caption using HuggingFace API (single call)
          let caption;
          try {
            // Current model - Fastest but less detailed
            const result = await hf.imageToText({
              model: "Salesforce/blip-image-captioning-base",
              data: file.buffer,
              wait_for_model: true
            });

            // Option 1 - More descriptive, good for social media (uncomment to use)
            /*
            const result = await hf.imageToText({
              model: "microsoft/git-large-textcaps",
              data: file.buffer,
              wait_for_model: true
            });
            */

            // Option 2 - Most accurate but slowest (uncomment to use)
            /*
            const result = await hf.imageToText({
              model: "Salesforce/blip-image-captioning-large",
              data: file.buffer,
              wait_for_model: true
            });
            */
            
            caption = result.generated_text;
          } catch (error) {
            console.error("Caption generation error:", error);
            caption = "Failed to generate caption";
          }

          // Create captions array with single caption
          const uniqueCaptions = caption ? [caption] : ["No caption generated"];

          // Store image data
          const userId = req.headers['user-id'] as string;
          const image = await storage.createImage({
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size.toString(),
            data: base64Data,
            captions: uniqueCaptions.length > 0 ? uniqueCaptions : ['No caption generated'],
            userId: userId || null,
            isLoggedOut: !userId
          });

          return image;
        } catch (error) {
          console.error("Error processing file:", file.originalname, error);
          throw error;
        }
      }));

      res.json(results);
    } catch (error) {
      console.error("Failed to process images:", error);
      res.status(500).json({ 
        message: "Failed to process images",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/images/:id/preview", async (req, res) => {
    try {
      const image = await storage.getImageById(parseInt(req.params.id));
      if (!image || !image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      const buffer = Buffer.from(image.data, 'base64');
      res.setHeader('Content-Type', image.mimeType);
      res.send(buffer);
    } catch (error) {
      console.error("Failed to fetch image preview:", error);
      res.status(500).json({ message: "Failed to fetch image preview" });
    }
  });

  app.get("/api/images", async (req, res) => {
    try {
      const userId = req.headers['user-id'] as string;
      let images;
      
      if (!userId) {
        // For logged out users, only return recent images
        images = await storage.getRecentLoggedOutImages();
        // Trigger cleanup of old images
        await storage.cleanupLoggedOutImages();
      } else {
        images = await storage.getAllImages();
      }
      res.json(images);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  app.delete("/api/images/:id", async (req, res) => {
    try {
      await storage.deleteImage(parseInt(req.params.id));
      res.json({ message: "Image deleted" });
    } catch (error) {
      console.error("Failed to delete image:", error);
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  app.delete("/api/images", async (_req, res) => {
    try {
      await storage.deleteAllImages();
      res.status(200).json({ message: "All images deleted successfully" });
    } catch (error) {
      console.error("Failed to delete images:", error);
      res.status(500).json({ 
        message: "Failed to delete images",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return createServer(app);
}