import { Schema, model, Document } from 'mongoose';
import { z } from "zod";

// Define the Image interface
export interface IImage extends Document {
  filename: string;
  mimeType: string;
  size: string;
  url?: string;
  data: string; // Store base64 encoded image data
  captions: string[];
  createdAt: Date;
  userId?: string;
  isLoggedOut: boolean;
}

// Create the Mongoose schema
const imageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: String, required: true },
  url: { type: String },
  data: { type: String, required: true },
  captions: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String },
  isLoggedOut: { type: Boolean, default: false },
});

// Create and export the Mongoose model
export const Image = model<IImage>('Image', imageSchema);

// Zod schema for file upload validation
export const uploadSchema = z.object({
  files: z.array(z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine(type => 
      ['image/jpeg', 'image/png', 'image/webp'].includes(type), 
      'Only JPEG, PNG and WebP images are allowed'
    ),
    buffer: z.instanceof(Buffer),
    size: z.number().max(3 * 1024 * 1024, 'File size must be less than 3MB'),
  })).max(10, 'Maximum 10 files allowed'),
});

// Schema for inserting new images
export const insertImageSchema = z.object({
  filename: z.string(),
  mimeType: z.string(),
  size: z.string(),
  url: z.string().optional(),
  data: z.string(),
  captions: z.array(z.string()),
  userId: z.string().optional(),
  isLoggedOut: z.boolean().default(false),
});

export type InsertImage = z.infer<typeof insertImageSchema>;