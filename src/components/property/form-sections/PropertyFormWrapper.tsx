import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { propertyFormSchema } from "../schemas/propertyFormSchema";
import { PropertyFormSections } from "./PropertyFormSections";
import { usePropertySubmission } from "../hooks/usePropertySubmission";
import { PropertyType, City, ManagementType } from "@/integrations/supabase/types/enums";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";
import { useToast } from "@/hooks/use-toast";

export const PropertyFormWrapper = () => {
  const { isSubmitting, handleSubmit } = usePropertySubmission();
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

  const onSubmit = async (data: PropertyFormValues) => {
    console.log('Form submitted with data:', data);
    try {
      await handleSubmit(data, []); // We'll handle image upload separately
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PropertyFormSections form={form} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Form>
  );
};