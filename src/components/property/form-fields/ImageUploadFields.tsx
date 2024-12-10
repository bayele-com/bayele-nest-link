import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ImageUploadFieldsProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: File[];
}

export const ImageUploadFields = ({ handleImageChange, selectedImages }: ImageUploadFieldsProps) => {
  return (
    <div>
      <FormLabel>Property Images (Max 7 images, 500KB each)</FormLabel>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mt-1"
      />
      {selectedImages.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          {selectedImages.length} image(s) selected
        </div>
      )}
    </div>
  );
};