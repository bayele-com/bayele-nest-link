import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 7) {
      toast({
        title: "Too many images",
        description: "You can only upload up to 7 images",
        variant: "destructive",
      });
      return;
    }
    
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      
      if (file.size > 500000) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 500KB`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      console.log('Valid images selected:', validFiles);
      setSelectedImages(validFiles);
    }
  };

  return { selectedImages, handleImageChange };
};