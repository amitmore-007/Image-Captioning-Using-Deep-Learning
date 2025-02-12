import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { ImagePreview } from "./ImagePreview";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Image } from "@shared/schema";

export function ImageUpload() {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
      setSelectedFiles([]);
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

  const resetMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/images", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Reset failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setSelectedFiles([]);
      toast({
        title: "Success",
        description: "All images cleared",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    uploadMutation.mutate(formData);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      <div className="flex justify-between mb-4">
        <Button 
          variant="outline" 
          onClick={() => resetMutation.mutate()}
          disabled={resetMutation.isPending}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset All
        </Button>
      </div>

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
          Up to 10 images (JPG, PNG, WebP) • 20MB total
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Selected Images</h3>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => getRootProps().onClick?.()} 
              className="ml-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add More
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={file.name} className="relative">
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -right-2 -top-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <ImagePreview file={file} />
              </div>
            ))}
          </div>
          <Button
            className="mt-4 w-full"
            disabled={uploadMutation.isPending}
            onClick={handleUpload}
          >
            {uploadMutation.isPending ? "Processing..." : "Generate Captions"}
          </Button>
        </div>
      )}
    </Card>
  );
}