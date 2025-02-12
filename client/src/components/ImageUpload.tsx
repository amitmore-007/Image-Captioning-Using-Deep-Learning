import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { ImagePreview } from "./ImagePreview";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Image } from "@shared/schema";

export function ImageUpload() {
  const { toast } = useToast();
  
  const uploadMutation = useMutation<Image[], Error, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({
        title: "Success",
        description: "Images uploaded and captions generated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });
    uploadMutation.mutate(formData);
  }, [uploadMutation]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-[#2563EB] bg-blue-50' : 'border-gray-300 hover:border-[#2563EB]'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-[#4B5563] mb-2">
          {isDragActive ? (
            "Drop your images here"
          ) : (
            "Drag & drop images here, or click to select"
          )}
        </p>
        <p className="text-sm text-gray-500">
          Up to 10 images (JPG, PNG, WebP) &bull; 20MB total
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-4">Selected Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {acceptedFiles.map((file) => (
              <ImagePreview key={file.name} file={file} />
            ))}
          </div>
          <Button
            className="mt-4 w-full"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Processing..." : "Generate Captions"}
          </Button>
        </div>
      )}
    </Card>
  );
}
