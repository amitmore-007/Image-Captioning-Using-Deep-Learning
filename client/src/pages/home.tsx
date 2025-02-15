import { ImageUpload } from "@/components/ImageUpload";
import { CaptionResults } from "@/components/CaptionResults";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface Image {
  id: number;
  filename: string;
  mimeType: string;
  size: string;
  captions: string[];
}

export default function Home() {
  const queryClient = useQueryClient();
  const { data: images, isLoading, error } = useQuery<Image[]>({ 
    queryKey: ["/api/images"],
    retry: 1
  });

  console.log('Current images:', images); // Debug log

  const handleReset = async () => {
    try {
      const response = await fetch('/api/images', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to reset images');
      }
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
    } catch (error) {
      console.error('Reset error:', error);
      // You can add toast notification here if needed
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-inter text-[#111827]">
              Image Caption Generator
            </h1>
            <p className="text-[#4B5563]">
              Upload images to generate AI-powered captions
            </p>
          </div>
          {images && images.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset All
            </Button>
          )}
        </div>

        <div className="grid gap-8">
          <ImageUpload />

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : images && images.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-inter text-[#111827]">
                Generated Captions
              </h2>
              <CaptionResults images={images} onRemove={(id) => {
                fetch(`/api/images/${id}`, { method: 'DELETE' }).then(() => {
                  queryClient.invalidateQueries({ queryKey: ["/api/images"] });
                });
              }} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}