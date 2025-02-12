import { images, type Image, type InsertImage } from "@shared/schema";

export interface IStorage {
  createImage(image: InsertImage): Promise<Image>;
  getAllImages(): Promise<Image[]>;
}

export class MemStorage implements IStorage {
  private images: Map<number, Image>;
  currentId: number;

  constructor() {
    this.images = new Map();
    this.currentId = 1;
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = this.currentId++;
    const image: Image = {
      ...insertImage,
      id,
      createdAt: new Date(),
    };
    this.images.set(id, image);
    return image;
  }

  async getAllImages(): Promise<Image[]> {
    return Array.from(this.images.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
