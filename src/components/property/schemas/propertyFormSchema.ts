import * as z from "zod";
import { PropertyType, City, ManagementType } from "@/integrations/supabase/types/enums";

export const propertyFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.enum(Object.values(PropertyType) as [string, ...string[]]),
  city: z.enum(Object.values(City) as [string, ...string[]]),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.coerce.number().min(1, "Price is required"),
  bedrooms: z.coerce.number().min(1, "At least 1 bedroom is required"),
  bathrooms: z.coerce.number().min(1, "At least 1 bathroom is required"),
  area: z.coerce.number().optional(),
  management_type: z.enum(Object.values(ManagementType) as [string, ...string[]]),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;