import { Image, type IImage, type InsertImage } from "@shared/schema";

export interface IStorage {
  createImage(image: InsertImage): Promise<IImage>;
  getImageById(id: string): Promise<IImage | undefined>;
  getAllImages(): Promise<IImage[]>;
  deleteImage(id: string): Promise<void>;
  deleteAllImages(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createImage(insertImage: InsertImage): Promise<IImage> {
    const image = new Image({
      ...insertImage,
      captions: Array.isArray(insertImage.captions) ? insertImage.captions : [insertImage.captions],
    });
    return await image.save();
  }

  async getImageById(id: string): Promise<IImage | undefined> {
    const image = await Image.findById(id);
    return image || undefined;
  }

  async getAllImages(): Promise<IImage[]> {
    return await Image.find().sort({ createdAt: -1 });
  }

  async deleteImage(id: string): Promise<void> {
    await Image.findByIdAndDelete(id);
  }

  async deleteAllImages(): Promise<void> {
    await Image.deleteMany({});
  }

  async cleanupLoggedOutImages(): Promise<void> {
    await Image.deleteMany({ isLoggedOut: true });
  }

  async getRecentLoggedOutImages(): Promise<IImage[]> {
    return await Image.find({ isLoggedOut: true }).sort({ createdAt: -1 });
  }
}

export const storage = new DatabaseStorage();