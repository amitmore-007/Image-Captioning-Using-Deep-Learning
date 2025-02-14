import { Card } from "@/components/ui/card";
import { Copy, X } from "lucide-react";
import type { Image } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface CaptionResultsProps {
  images: Image[];
  onRemove: (id: number) => void;
}

export function CaptionResults({ images, onRemove }: CaptionResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "Caption copied to clipboard",
      });
    });
  };

  // Filter out duplicate captions for each image
  const getUniqueCaptions = (captions: string[]) => {
    return Array.from(new Set(captions));
  };

  return (
    <div className="grid gap-6">
      {images.map((image) => (
        <Card key={image.id} className="p-6 bg-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-3 -top-3 z-10 bg-white hover:bg-gray-100"
                onClick={() => onRemove(image.id)}
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="w-full max-w-[300px] mx-auto aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
                <img
                  src={`/api/images/${image.id}/preview`}
                  alt={image.filename}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {image.filename} • {formatSize(parseInt(image.size))}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Generated Captions:</h3>
              <ul className="space-y-2">
                {getUniqueCaptions(image.captions).map((caption, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-sm flex justify-between items-start gap-2 group hover:bg-gray-100"
                  >
                    <span className="text-gray-700">{caption}</span>
                    <button
                      onClick={() => copyToClipboard(caption)}
                      className="p-1 hover:bg-gray-200 rounded shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy caption"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}