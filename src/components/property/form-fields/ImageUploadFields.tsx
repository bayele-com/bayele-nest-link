import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ImageUploadFieldsProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: File[];
}

export const ImageUploadFields = ({ handleImageChange, selectedImages }: ImageUploadFieldsProps) => {
  const [error, setError] = useState<string | null>(null);

  const validateAndHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []);
    
    // Validate number of files
    if (files.length > 7) {
      setError("Maximum 7 images allowed");
      return;
    }

    // Validate file types and sizes
    const invalidFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image file`);
        return true;
      }
      if (file.size > 500000) { // 500KB
        setError(`${file.name} is larger than 500KB`);
        return true;
      }
      return false;
    });

    if (invalidFiles.length > 0) {
      return;
    }

    handleImageChange(e);
  };

  return (
    <div className="space-y-2">
      <FormLabel>Property Images (Max 7 images, 500KB each)</FormLabel>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={validateAndHandleChange}
        className="mt-1"
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {selectedImages.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          {selectedImages.length} image(s) selected
        </div>
      )}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative aspect-video rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};