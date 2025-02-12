import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import { storage } from "./storage";
import { HfInference } from "@huggingface/inference";

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
        // Generate captions using Hugging Face
        const captions = await Promise.all([1, 2, 3].map(async () => {
          const result = await hf.imageToText({
            model: "Salesforce/blip-image-captioning-base",
            data: file.buffer,
          });
          return result.generated_text;
        }));

        // Store image data
        const image = await storage.createImage({
          filename: file.originalname,
          mimeType: file.mimetype,
          size: file.size.toString(),
          captions,
        });

        return image;
      }));

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to process images" });
    }
  });

  app.get("/api/images", async (_req, res) => {
    try {
      const images = await storage.getAllImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  return createServer(app);
}
