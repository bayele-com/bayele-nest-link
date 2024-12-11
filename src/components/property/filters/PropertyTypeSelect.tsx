import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface PropertyTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const PropertyTypeSelect = ({ value, onChange }: PropertyTypeSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <div className="flex items-center">
          <Building2 className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Property Type" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="house">House</SelectItem>
        <SelectItem value="apartment">Apartment</SelectItem>
        <SelectItem value="studio">Studio</SelectItem>
        <SelectItem value="furnished">Furnished Apartment</SelectItem>
      </SelectContent>
    </Select>
  );
};