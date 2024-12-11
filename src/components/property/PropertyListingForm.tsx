import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUser } from "@supabase/auth-helpers-react";
import { propertyFormSchema } from "./schemas/propertyFormSchema";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { LocationFields } from "./form-fields/LocationFields";
import { PropertyDetailsFields } from "./form-fields/PropertyDetailsFields";
import { ManagementFields } from "./form-fields/ManagementFields";
import { ContactFields } from "./form-fields/ContactFields";
import { ImageUploadFields } from "./form-fields/ImageUploadFields";
import { PropertyStatus } from "@/integrations/supabase/types/enums";

const PropertyListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUser();

  const form = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "APARTMENT",
      city: "YAOUNDE",
      location: "",
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: undefined,
      management_type: "SELF",
      phone: "",
      whatsapp: "",
    },
  });

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

  const uploadImages = async (propertyId: string) => {
    const uploadPromises = selectedImages.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const propertyData = {
        ...data,
        owner_id: user?.id || null,
        status: user?.id ? PropertyStatus.PENDING : PropertyStatus.PENDING,
        amenities: [],
      };

      const { data: property, error: insertError } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (insertError) throw insertError;

      if (selectedImages.length > 0) {
        const imageUrls = await uploadImages(property.id);
        const { error: updateError } = await supabase
          .from('properties')
          .update({ images: imageUrls })
          .eq('id', property.id);

        if (updateError) throw updateError;
      }

      toast({
        title: "Property submitted",
        description: user?.id 
          ? "Your property has been submitted for review."
          : "Your property has been submitted for review. Create an account to manage your listings.",
      });

      if (user?.id) {
        navigate("/manage");
      } else {
        navigate("/auth/register");
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: "Failed to submit property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        <LocationFields form={form} />
        <PropertyDetailsFields form={form} />
        <ManagementFields form={form} />
        <ContactFields form={form} />
        
        <div>
          <ImageUploadFields
            handleImageChange={handleImageChange}
            selectedImages={selectedImages}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyListingForm;