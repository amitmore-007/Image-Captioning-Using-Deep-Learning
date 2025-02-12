import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import { storage } from "./storage";
import { HfInference } from "@huggingface/inference";
import { uploadSchema } from "@shared/schema";

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

      const results = await Promise.all(files.map(async (file) => {
        try {
          // Generate captions using Hugging Face
          const captionPromises = Array(3).fill(null).map(async () => {
            const result = await hf.imageToText({
              model: "Salesforce/blip-image-captioning-base",
              data: Buffer.from(file.buffer),
            });
            return result.generated_text;
          });

          const captions = await Promise.all(captionPromises);

          // Store image data
          const image = await storage.createImage({
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size.toString(),
            captions: captions.filter(caption => caption !== undefined) as string[],
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
      res.status(500).json({ message: "Failed to process images" });
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

  return createServer(app);
}