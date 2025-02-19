import { images, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { desc, eq, and, lt, gt } from "drizzle-orm";

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
    // Old code with 10-minute condition
    /*
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    await db.delete(images)
      .where(and(
        eq(images.isLoggedOut, true),
        lt(images.createdAt, tenMinutesAgo)
      ));
    */
    
    // New code: delete logged out images immediately
    await db.delete(images)
      .where(eq(images.isLoggedOut, true));
  }

  async getRecentLoggedOutImages(): Promise<Image[]> {
    // Old code with 10-minute condition
    /*
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    return db.select()
      .from(images)
      .where(
        and(
          eq(images.isLoggedOut, true),
          gt(images.createdAt, tenMinutesAgo)
        )
      )
      .orderBy(desc(images.createdAt));
    */
    
    // New code: return all logged out images (they will be cleaned up after upload)
    return db.select()
      .from(images)
      .where(eq(images.isLoggedOut, true))
      .orderBy(desc(images.createdAt));
  }
}

export const storage = new DatabaseStorage();