import { ImageUpload } from "@/components/ImageUpload";
import { CaptionResults } from "@/components/CaptionResults";
import { useQuery } from "@tanstack/react-query";
import type { Image } from "@shared/schema";

export default function Home() {
  const { data: images } = useQuery<Image[]>({ 
    queryKey: ["/api/images"]
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-2 font-inter text-[#111827]">
          Image Caption Generator
        </h1>
        <p className="text-[#4B5563] mb-8">
          Upload images to generate AI-powered captions
        </p>
        
        <div className="grid gap-8">
          <ImageUpload />
          
          {images && images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-inter text-[#111827]">
                Generated Captions
              </h2>
              <CaptionResults images={images} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
