import { images, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createImage(image: InsertImage): Promise<Image>;
  getImageById(id: number): Promise<Image | undefined>;
  getAllImages(): Promise<Image[]>;
  deleteImage(id: number): Promise<void>;
  deleteAllImages(): Promise<void>;
  cleanupLoggedOutImages(): Promise<void>;
  getRecentLoggedOutImages(): Promise<Image[]>;
}

export class DatabaseStorage implements IStorage {
  async createImage(insertImage: InsertImage): Promise<Image> {
    try {
      console.log('Creating image in database with filename:', insertImage.filename);
      const [image] = await db
        .insert(images)
        .values(insertImage)
        .returning();
      console.log('Image created successfully with ID:', image.id);
      return image;
    } catch (error) {
      console.error('Error creating image in database:', error);
      throw error;
    }
  }

  async getImageById(id: number): Promise<Image | undefined> {
    try {
      console.log('Fetching image with ID:', id);
      const [image] = await db
        .select()
        .from(images)
        .where(eq(images.id, id));
      console.log('Image fetch result:', image ? 'Found' : 'Not found');
      return image;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }

  async getAllImages(): Promise<Image[]> {
    try {
      const allImages = await db
        .select()
        .from(images)
        .orderBy(desc(images.createdAt));
      console.log(`Fetched ${allImages.length} images`);
      return allImages;
    } catch (error) {
      console.error('Error fetching all images:', error);
      throw error;
    }
  }

  async deleteImage(id: number): Promise<void> {
    try {
      await db
        .delete(images)
        .where(eq(images.id, id));
      console.log('Image deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  async deleteAllImages(): Promise<void> {
    try {
      await db.delete(images);
      console.log('All images deleted successfully');
    } catch (error) {
      console.error('Error deleting all images:', error);
      throw error;
    }
  }

  async cleanupLoggedOutImages(): Promise<void> {
    try {
      await db.delete(images)
        .where(eq(images.isLoggedOut, true));
      console.log('Cleaned up logged out images');
    } catch (error) {
      console.error('Error cleaning up logged out images:', error);
      throw error;
    }
  }

  async getRecentLoggedOutImages(): Promise<Image[]> {
    try {
      const recentImages = await db
        .select()
        .from(images)
        .where(eq(images.isLoggedOut, true))
        .orderBy(desc(images.createdAt));
      console.log(`Fetched ${recentImages.length} recent logged out images`);
      return recentImages;
    } catch (error) {
      console.error('Error fetching recent logged out images:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();