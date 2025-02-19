import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import { storage } from "./storage";
import { HfInference } from "@huggingface/inference";
import { uploadSchema } from "@shared/schema";
import { z } from "zod";
import { checkDatabaseConnection } from "./db";

if (!process.env.HUGGINGFACE_TOKEN) {
  throw new Error("HUGGINGFACE_TOKEN must be set");
}

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
const upload = multer({ 
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10 
  }
});

export function registerRoutes(app: Express) {
  // Health check endpoint
  app.get("/api/health", async (_req, res) => {
    const isDbConnected = await checkDatabaseConnection();
    if (!isDbConnected) {
      return res.status(503).json({ status: "error", message: "Database connection failed" });
    }
    res.json({ status: "ok", message: "Service is healthy" });
  });

  app.post("/api/images", upload.array("files", 10), async (req, res) => {
    try {
      // Check database connection before proceeding
      const isDbConnected = await checkDatabaseConnection();
      if (!isDbConnected) {
        return res.status(503).json({ message: "Database service unavailable" });
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const parseResult = uploadSchema.safeParse({ files });
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid upload",
          errors: parseResult.error.errors
        });
      }

      const results = await Promise.all(files.map(async (file) => {
        try {
          const base64Data = file.buffer.toString('base64');

          // Generate caption
          let caption: string;
          try {
            const result = await hf.imageToText({
              model: "Salesforce/blip-image-captioning-base",
              data: file.buffer,
              wait_for_model: true
            });
            caption = result.generated_text;
          } catch (error) {
            console.error("Caption generation error:", error);
            caption = "Failed to generate caption";
          }

          const userId = req.headers['user-id'] as string;
          const image = await storage.createImage({
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size.toString(),
            data: base64Data,
            captions: [caption],
            userId: userId || null,
            isLoggedOut: !userId,
            url: null
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
      const isDbConnected = await checkDatabaseConnection();
      if (!isDbConnected) {
        return res.status(503).json({ message: "Database service unavailable" });
      }

      const userId = req.headers['user-id'] as string;
      const images = !userId ? 
        await storage.getRecentLoggedOutImages() :
        await storage.getAllImages();

      res.json(images);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      res.status(500).json({ 
        message: "Failed to fetch images",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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