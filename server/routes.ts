// import type { Express } from "express";
// import { createServer } from "http";
// import multer from "multer";
// import { storage } from "./storage";
// import { HfInference } from "@huggingface/inference";
// import { uploadSchema } from "@shared/schema";
// import { z } from "zod";

// if (!process.env.HUGGINGFACE_TOKEN) {
//   throw new Error("HUGGINGFACE_TOKEN must be set");
// }

// const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
// const upload = multer({ 
//   limits: { 
//     fileSize: 5 * 1024 * 1024, // 5MB
//     files: 10 
//   }
// });

// export function registerRoutes(app: Express) {
//   app.post("/api/images", upload.array("files", 10), async (req, res) => {
//     try {
//       const files = req.files as Express.Multer.File[];

//       if (!files || files.length === 0) {
//         return res.status(400).json({ message: "No files uploaded" });
//       }

//       console.log(`Processing ${files.length} files`); // Debug log

//       // Validate the uploaded files using the schema
//       const parseResult = uploadSchema.safeParse({ files });

//       if (!parseResult.success) {
//         console.error('Upload validation failed:', parseResult.error); // Debug log
//         return res.status(400).json({ 
//           message: "Invalid upload",
//           errors: parseResult.error.errors.map(err => ({
//             message: err.message,
//             path: err.path.join('.')
//           }))
//         });
//       }

//       const results = await Promise.all(files.map(async (file, index) => {
//         try {
//           console.log(`Processing file ${index + 1}/${files.length}: ${file.originalname}`); // Debug log

//           // Convert buffer to base64 for storage
//           const base64Data = Buffer.from(file.buffer).toString('base64');

//           // Generate caption using HuggingFace API
//           let caption;
//           try {
//             console.log(`Generating caption for ${file.originalname}`); // Debug log
//             const result = await hf.imageToText({
//               model: "Salesforce/blip-image-captioning-base",
//               data: file.buffer,
//               wait_for_model: true
//             });
//             caption = result.generated_text;
//             console.log(`Caption generated: ${caption}`); // Debug log
//           } catch (error: any) {
//             if (error.response?.status === 429) {
//               console.error("Rate limit exceeded");
//               throw new Error("Rate limit exceeded. Please try again later.");
//             }
//             console.error("Caption generation error:", error);
//             caption = "Failed to generate caption";
//           }

//           // Create captions array with single caption
//           const uniqueCaptions = caption ? [caption] : ["No caption generated"];

//           // Store image data
//           const userId = req.headers['user-id'] as string;
//           console.log(`Storing image in database: ${file.originalname}`); // Debug log

//           const imageData = {
//             filename: file.originalname,
//             mimeType: file.mimetype,
//             size: file.size.toString(),
//             data: base64Data,
//             captions: uniqueCaptions,
//             userId: userId || null,
//             isLoggedOut: !userId,
//             url: null
//           };

//           const image = await storage.createImage(imageData);
//           console.log(`Image stored successfully with ID: ${image.id}`); // Debug log

//           return image;
//         } catch (error) {
//           console.error(`Error processing file ${file.originalname}:`, error);
//           throw error;
//         }
//       }));

//       res.json(results);
//     } catch (error) {
//       console.error("Failed to process images:", error);
//       res.status(500).json({ 
//         message: "Failed to process images",
//         error: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   });

//   app.get("/api/images/:id/preview", async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       console.log(`Attempting to fetch image preview for ID: ${id}`);

//       const image = await storage.getImageById(id);
//       if (!image) {
//         console.error(`Image not found in database for id: ${id}`);
//         return res.status(404).json({ message: "Image not found" });
//       }

//       if (!image.data) {
//         console.error(`Image data is missing for id: ${id}`);
//         return res.status(404).json({ message: "Image data not found" });
//       }

//       try {
//         // Decode base64 string to buffer
//         const buffer = Buffer.from(image.data, 'base64');

//         // Set proper content type and cache headers
//         res.setHeader('Content-Type', image.mimeType);
//         res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

//         // Send the buffer
//         return res.send(buffer);
//       } catch (decodeError) {
//         console.error('Error decoding image data:', decodeError);
//         return res.status(500).json({ message: "Error processing image data" });
//       }
//     } catch (error) {
//       console.error("Failed to fetch image preview:", error);
//       return res.status(500).json({ message: "Failed to fetch image preview" });
//     }
//   });

//   app.get("/api/images", async (req, res) => {
//     try {
//       const userId = req.headers['user-id'] as string;
//       let images;

//       if (!userId) {
//         // For logged out users, only return recent images
//         images = await storage.getRecentLoggedOutImages();
//         // Trigger cleanup of old images
//         await storage.cleanupLoggedOutImages();
//       } else {
//         images = await storage.getAllImages();
//       }
//       res.json(images);
//     } catch (error) {
//       console.error("Failed to fetch images:", error);
//       res.status(500).json({ message: "Failed to fetch images" });
//     }
//   });

//   app.delete("/api/images/:id", async (req, res) => {
//     try {
//       await storage.deleteImage(parseInt(req.params.id));
//       res.json({ message: "Image deleted" });
//     } catch (error) {
//       console.error("Failed to delete image:", error);
//       res.status(500).json({ message: "Failed to delete image" });
//     }
//   });

//   app.delete("/api/images", async (_req, res) => {
//     try {
//       await storage.deleteAllImages();
//       res.status(200).json({ message: "All images deleted successfully" });
//     } catch (error) {
//       console.error("Failed to delete images:", error);
//       res.status(500).json({ 
//         message: "Failed to delete images",
//         error: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   });

//   return createServer(app);
// }

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
    fileSize: 5 * 1024 * 1024, // 20MB
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
          // Convert buffer to base64 for storage
          const base64Data = file.buffer.toString('base64');

          // Generate 3 captions in parallel and take the first one that completes
          const captionPromises = Array(3).fill(null).map(async () => {
            try {
              const result = await hf.imageToText({
                model: "Salesforce/blip-image-captioning-base",
                data: file.buffer,
                wait_for_model: false
              });
              return result.generated_text;
            } catch (error) {
              console.error("Caption generation error:", error);
              return undefined;
            }
          });

          // Get unique captions, filtering out undefined and duplicates
          const allCaptions = await Promise.all(captionPromises);
          const uniqueCaptions = Array.from(new Set(allCaptions.filter(Boolean)));

          // Store image data and buffer
          const image = await storage.createImage({
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size.toString(),
            data: base64Data,
            captions: uniqueCaptions,
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