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
    console.log('Starting image upload for property:', propertyId);
    const uploadPromises = images.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Math.random()}.${fileExt}`;
      
      console.log('Uploading image:', fileName);
      const { error: uploadError, data } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      console.log('Image uploaded successfully:', publicUrl);
      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (data: PropertyFormValues, selectedImages: File[]) => {
    console.log('Starting property submission with data:', data);
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

      console.log('Inserting property with data:', propertyData);
      const { data: property, error: insertError } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (insertError) {
        console.error('Property insertion error:', insertError);
        throw insertError;
      }

      console.log('Property inserted successfully:', property);

      if (selectedImages.length > 0) {
        console.log('Uploading property images...');
        const imageUrls = await uploadImages(property.id, selectedImages);
        
        const { error: updateError } = await supabase
          .from('properties')
          .update({ images: imageUrls })
          .eq('id', property.id);

        if (updateError) {
          console.error('Error updating property with image URLs:', updateError);
          throw updateError;
        }
        console.log('Property images updated successfully');
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
        description: error.message || "Failed to submit property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
};