import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size").notNull(),
  url: text("url"),
  data: text("data").notNull(), // Store base64 encoded image data
  captions: jsonb("captions").notNull().$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertImageSchema = createInsertSchema(images, {
  id: undefined,
  createdAt: undefined,
});

// Update the upload schema to handle multer files
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

export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;