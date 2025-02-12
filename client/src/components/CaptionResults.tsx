import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import type { Image } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface CaptionResultsProps {
  images: Image[];
}

export function CaptionResults({ images }: CaptionResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "Caption copied to clipboard",
      });
    });
  };

  return (
    <div className="grid gap-6">
      {images.map((image) => (
        <Card key={image.id} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={URL.createObjectURL(new Blob([], { type: image.mimeType }))}
                alt={image.filename}
                className="w-full aspect-video object-cover rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-500">
                {image.filename} • {formatSize(parseInt(image.size))}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 font-mono">Generated Captions:</h3>
              <ul className="space-y-2">
                {image.captions.map((caption, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg font-mono text-sm flex justify-between items-start gap-2"
                  >
                    <span>{caption}</span>
                    <button
                      onClick={() => copyToClipboard(caption)}
                      className="p-1 hover:bg-gray-200 rounded"
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