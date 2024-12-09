import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { BasicInfoFields } from "./form-fields/BasicInfoFields";
import { PropertyDetailsFields } from "./form-fields/PropertyDetailsFields";
import { LocationFields } from "./form-fields/LocationFields";
import { ManagementFields } from "./form-fields/ManagementFields";
import { ImageUploadFields } from "./form-fields/ImageUploadFields";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.string().min(1, "Price is required"),
  type: z.string().min(1, "Property type is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  managementType: z.string().min(1, "Management type is required"),
  images: z.array(z.string()).min(1, "At least one image is required").max(7, "Maximum 7 images allowed"),
});

const PropertyListingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      city: "",
      location: "",
      managementType: "",
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);
      toast.success("Property listed successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to list property. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PropertyDetailsFields form={form} />
          <LocationFields form={form} />
          <ManagementFields form={form} />
        </div>

        <ImageUploadFields form={form} />

        <Button type="submit" className="w-full">
          List Property
        </Button>
      </form>
    </Form>
  );
};

export default PropertyListingForm;