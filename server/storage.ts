import { images, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createImage(image: InsertImage): Promise<Image>;
  getImageById(id: number): Promise<Image | undefined>;
  getAllImages(): Promise<Image[]>;
  deleteImage(id: number): Promise<void>;
  deleteAllImages(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values({
        ...insertImage,
        captions: Array.isArray(insertImage.captions) ? insertImage.captions : [insertImage.captions],
      })
      .returning();
    return image;
  }

  async getImageById(id: number): Promise<Image | undefined> {
    const [image] = await db
      .select()
      .from(images)
      .where(eq(images.id, id));
    return image;
  }

  async getAllImages(): Promise<Image[]> {
    const allImages = await db
      .select()
      .from(images)
      .orderBy(desc(images.createdAt));
    return allImages;
  }

  async deleteImage(id: number): Promise<void> {
    await db
      .delete(images)
      .where(eq(images.id, id));
  }

  async deleteAllImages(): Promise<void> {
    await db.delete(images);
  }

  async cleanupLoggedOutImages(): Promise<void> {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    await db.delete(images)
      .where(and(
        eq(images.isLoggedOut, true),
        lt(images.createdAt, tenMinutesAgo)
      ));
  }

  async getRecentLoggedOutImages(): Promise<Image[]> {
    return db.select()
      .from(images)
      .where(eq(images.isLoggedOut, true))
      .orderBy(desc(images.createdAt))
      .limit(2);
  }
}

export const storage = new DatabaseStorage();