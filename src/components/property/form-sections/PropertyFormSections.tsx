import { UseFormReturn } from "react-hook-form";
import { BasicInfoFields } from "../form-fields/BasicInfoFields";
import { LocationFields } from "../form-fields/LocationFields";
import { PropertyDetailsFields } from "../form-fields/PropertyDetailsFields";
import { ManagementFields } from "../form-fields/ManagementFields";
import { ContactFields } from "../form-fields/ContactFields";
import { ImageUploadFields } from "../form-fields/ImageUploadFields";
import { useImageUpload } from "../hooks/useImageUpload";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";

interface PropertyFormSectionsProps {
  form: UseFormReturn<PropertyFormValues>;
  onSubmit: (data: PropertyFormValues, images: File[]) => Promise<void>;
}

export const PropertyFormSections = ({ form, onSubmit }: PropertyFormSectionsProps) => {
  const { handleImageChange, selectedImages } = useImageUpload();

  const handleFormSubmit = form.handleSubmit((data) => {
    onSubmit(data, selectedImages);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <BasicInfoFields form={form} />
      <LocationFields form={form} />
      <PropertyDetailsFields form={form} />
      <ManagementFields form={form} />
      <ContactFields form={form} />
      <ImageUploadFields
        handleImageChange={handleImageChange}
        selectedImages={selectedImages}
      />
    </form>
  );
};