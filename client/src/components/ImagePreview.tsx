import { Card } from "@/components/ui/card";

interface ImagePreviewProps {
  file: File;
}

export function ImagePreview({ file }: ImagePreviewProps) {
  return (
    <Card className="relative aspect-square overflow-hidden">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs truncate">
        {file.name}
      </div>
    </Card>
  );
}
