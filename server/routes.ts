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
    fileSize: 20 * 1024 * 1024, // 20MB
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

          // Generate captions using HuggingFace API
          const captionPromises = Array(3).fill(null).map(async () => {
            try {
              const result = await hf.imageToText({
                model: "Salesforce/blip-image-captioning-base",
                data: file.buffer,
                wait_for_model: true
              });
              return result.generated_text;
            } catch (error) {
              console.error("Caption generation error:", error);
              return undefined;
            }
          });

          // Get unique captions, filtering out undefined and duplicates
          const allCaptions = await Promise.all(captionPromises);
          const uniqueCaptions = Array.from(new Set(
            allCaptions.filter((caption): caption is string => typeof caption === 'string')
          ));

          // Store image data
          const image = await storage.createImage({
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size.toString(),
            data: base64Data,
            captions: uniqueCaptions.length > 0 ? uniqueCaptions : ['No caption generated'],
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

  app.get("/api/images", async (_req, res) => {
    try {
      const images = await storage.getAllImages();
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
      res.json({ message: "All images deleted" });
    } catch (error) {
      console.error("Failed to delete images:", error);
      res.status(500).json({ message: "Failed to delete images" });
    }
  });

  return createServer(app);
}