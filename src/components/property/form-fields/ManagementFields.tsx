import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface ManagementFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  managementType: z.string().min(1, "Management type is required"),
});

export const ManagementFields = ({ form }: ManagementFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="managementType"
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
              <SelectItem value="self">Self Managed</SelectItem>
              <SelectItem value="bayele">Bayele Manages</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};