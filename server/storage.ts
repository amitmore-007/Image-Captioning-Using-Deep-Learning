import { images, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createImage(image: InsertImage): Promise<Image>;
  getAllImages(): Promise<Image[]>;
}

export class DatabaseStorage implements IStorage {
  async createImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values([insertImage])
      .returning();
    return image;
  }

  async getAllImages(): Promise<Image[]> {
    const allImages = await db
      .select()
      .from(images)
      .orderBy(desc(images.createdAt));
    return allImages;
  }
}

export const storage = new DatabaseStorage();