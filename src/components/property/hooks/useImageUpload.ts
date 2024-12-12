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

    setSelectedImages(validFiles);
  };

  return { selectedImages, handleImageChange };
};