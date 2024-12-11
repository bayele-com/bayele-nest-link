import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select City" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="yaounde">Yaoundé</SelectItem>
        <SelectItem value="douala">Douala</SelectItem>
      </SelectContent>
    </Select>
  );
};