import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { PropertyStatus } from "@/integrations/supabase/types/enums";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";
import type { TablesInsert } from "@/integrations/supabase/types";

export const usePropertySubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUser();

  const uploadImages = async (propertyId: string, images: File[]) => {
    const uploadPromises = images.map(async (file) => {
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

  const handleSubmit = async (data: PropertyFormValues, selectedImages: File[]) => {
    try {
      setIsSubmitting(true);

      const propertyData: TablesInsert<"properties"> = {
        title: data.title,
        description: data.description,
        type: data.type,
        city: data.city,
        location: data.location,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        management_type: data.management_type,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        owner_id: user?.id || null,
        status: PropertyStatus.PENDING,
        amenities: [],
        images: [],
        is_featured: false,
      };

      const { data: property, error: insertError } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (insertError) throw insertError;

      if (selectedImages.length > 0) {
        const imageUrls = await uploadImages(property.id, selectedImages);
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
    } catch (error: any) {
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

  return { isSubmitting, handleSubmit };
};