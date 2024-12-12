import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { propertyFormSchema } from "../schemas/propertyFormSchema";
import { PropertyFormSections } from "./PropertyFormSections";
import { usePropertySubmission } from "../hooks/usePropertySubmission";
import { PropertyType, City, ManagementType } from "@/integrations/supabase/types/enums";
import type { PropertyFormValues } from "../schemas/propertyFormSchema";

export const PropertyFormWrapper = () => {
  const { isSubmitting, handleSubmit } = usePropertySubmission();

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

  return (
    <Form {...form}>
      <div className="space-y-6">
        <PropertyFormSections form={form} onSubmit={handleSubmit} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </Button>
      </div>
    </Form>
  );
};