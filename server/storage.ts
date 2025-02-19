import { Image, type IImage, type InsertImage } from "@shared/schema";

export interface IStorage {
  createImage(image: InsertImage): Promise<IImage>;
  getImageById(id: string): Promise<IImage | undefined>;
  getAllImages(): Promise<IImage[]>;
  deleteImage(id: string): Promise<void>;
  deleteAllImages(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private async withRetry<T>(operation: () => Promise<T>, retries = 3): Promise<T> {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        console.error(`Operation failed (attempt ${i + 1}/${retries}):`, error);
        lastError = error;
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
      }
    }
    throw lastError;
  }

  async createImage(insertImage: InsertImage): Promise<IImage> {
    return this.withRetry(async () => {
      const image = new Image({
        ...insertImage,
        captions: Array.isArray(insertImage.captions) ? insertImage.captions : [insertImage.captions],
      });
      return await image.save();
    });
  }

  async getImageById(id: string): Promise<IImage | undefined> {
    return this.withRetry(async () => {
      const image = await Image.findById(id);
      return image || undefined;
    });
  }

  async getAllImages(): Promise<IImage[]> {
    return this.withRetry(async () => {
      return await Image.find().sort({ createdAt: -1 });
    });
  }

  async deleteImage(id: string): Promise<void> {
    await this.withRetry(async () => {
      await Image.findByIdAndDelete(id);
    });
  }

  async deleteAllImages(): Promise<void> {
    await this.withRetry(async () => {
      await Image.deleteMany({});
    });
  }

  async cleanupLoggedOutImages(): Promise<void> {
    await this.withRetry(async () => {
      await Image.deleteMany({ isLoggedOut: true });
    });
  }

  async getRecentLoggedOutImages(): Promise<IImage[]> {
    return this.withRetry(async () => {
      return await Image.find({ isLoggedOut: true }).sort({ createdAt: -1 });
    });
  }
}

export const storage = new DatabaseStorage();