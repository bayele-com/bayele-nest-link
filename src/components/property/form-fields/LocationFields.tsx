import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../schemas/propertyFormSchema";
import { City } from "@/integrations/supabase/types/enums";

interface LocationFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export const LocationFields = ({ form }: LocationFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(City).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key === 'YAOUNDE' ? 'Yaoundé' : 'Douala'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location/Neighborhood</FormLabel>
            <FormControl>
              <Input placeholder="Bastos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};