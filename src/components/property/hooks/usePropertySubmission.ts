import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { PropertyStatus } from "@/integrations/supabase/types/enums";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";

export const usePropertySubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const uploadImages = async (propertyId: string, images: File[]) => {
    console.log('Starting image upload for property:', propertyId);
    console.log('Number of images to upload:', images.length);
    
    if (images.length === 0) {
      console.log('No images to upload');
      return [];
    }

    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Math.random()}.${fileExt}`;
      
      console.log(`Uploading image ${index + 1}/${images.length}:`, fileName);
      
      if (!file.type.startsWith('image/')) {
        console.error(`File ${file.name} is not an image`);
        throw new Error(`File ${file.name} is not an image`);
      }

      const { error: uploadError, data } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error(`Image ${index + 1} upload error:`, uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      console.log(`Image ${index + 1} uploaded successfully:`, publicUrl);
      return publicUrl;
    });

    try {
      const urls = await Promise.all(uploadPromises);
      console.log('All images uploaded successfully:', urls);
      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleSubmit = async (data: PropertyFormValues, selectedImages: File[]) => {
    console.log('Starting property submission with data:', data);
    console.log('Number of images selected:', selectedImages.length);
    
    try {
      setIsSubmitting(true);

      // Check if user is authenticated
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log('User not authenticated, storing form data in session storage');
        // Store the submission data and current path
        sessionStorage.setItem('pendingPropertySubmission', JSON.stringify({
          formData: data,
          images: selectedImages,
          returnPath: location.pathname,
          timestamp: new Date().toISOString()
        }));
        
        // Redirect to login with return URL
        navigate('/auth/login?returnTo=/manage', { 
          state: { 
            from: location.pathname,
            pendingSubmission: true 
          }
        });
        return;
      }

      const propertyData = {
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
        owner_id: session.user.id,
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
        console.log('Starting image upload process...');
        const imageUrls = await uploadImages(property.id, selectedImages);
        
        // Update property with image URLs
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
        description: "Your property has been submitted for review.",
      });

      // Clear any stored submission data
      sessionStorage.removeItem('pendingPropertySubmission');
      
      // Navigate to manage page after successful submission
      navigate("/manage");
      
    } catch (error: any) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit property",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
};