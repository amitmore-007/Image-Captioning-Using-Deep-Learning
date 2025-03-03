import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { ImagePreview } from "./ImagePreview";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageUpload() {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Upload failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      // Log the response data to see what we're getting back
      console.log('Upload response:', data);
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setSelectedFiles([]);
      toast({
        description: "Images uploaded and captions generated",
      });
    },
    onError: (error: Error) => {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev, ...acceptedFiles];
      return newFiles.slice(0, 10); // Limit to 10 files total
    });
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await uploadMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Upload error:', error);
    }
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
    noClick: false, // Enable click-to-upload
  });

  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          {isDragActive ? "Drop your images here" : "Drag & drop images here, or click to select"}
        </p>
        <p className="text-sm text-gray-500">
          Up to 10 images (JPG, PNG, WebP) • Max 3MB per image
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Selected Images ({selectedFiles.length}/10)</h3>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.click();
              }}
              disabled={selectedFiles.length >= 10 || uploadMutation.isPending}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add More
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -right-2 -top-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  disabled={uploadMutation.isPending}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <ImagePreview file={file} />
              </div>
            ))}
          </div>
          <Button
            className="mt-4 w-full"
            disabled={uploadMutation.isPending || selectedFiles.length === 0}
            onClick={handleUpload}
          >
            {uploadMutation.isPending ? "Processing..." : "Generate Captions"}
          </Button>
        </div>
      )}
    </Card>
  );
}