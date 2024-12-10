import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../schemas/propertyFormSchema";
import { ManagementType } from "@/integrations/supabase/types/enums";

interface ManagementFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export const ManagementFields = ({ form }: ManagementFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="management_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Management Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select management type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(ManagementType).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key === 'SELF' ? 'Self Managed' : 'Bayele Manages'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};