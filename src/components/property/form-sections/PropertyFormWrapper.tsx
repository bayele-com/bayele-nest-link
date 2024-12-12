import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { propertyFormSchema } from "../schemas/propertyFormSchema";
import { PropertyFormSections } from "./PropertyFormSections";
import { usePropertySubmission } from "../hooks/usePropertySubmission";
import { PropertyType, City, ManagementType } from "@/integrations/supabase/types/enums";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";
import { useToast } from "@/hooks/use-toast";

export const PropertyFormWrapper = () => {
  const { isSubmitting, handleSubmit: submitProperty } = usePropertySubmission();
  const { toast } = useToast();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: PropertyType.APARTMENT,
      city: City.YAOUNDE,
      location: "",
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: undefined,
      management_type: ManagementType.SELF,
      phone: "",
      whatsapp: "",
    },
  });

  const onSubmit = async (data: PropertyFormValues, images: File[]) => {
    console.log('Form submitted with data:', data);
    console.log('Images to upload:', images);
    
    try {
      await submitProperty(data, images);
      toast({
        title: "Success",
        description: "Property submitted successfully",
      });
      form.reset();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit property",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <PropertyFormSections 
        form={form} 
        onSubmit={onSubmit}
      />
    </Form>
  );
};