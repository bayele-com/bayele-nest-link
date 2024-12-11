import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home } from "lucide-react";

interface BedroomsSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const BedroomsSelect = ({ value, onChange }: BedroomsSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <div className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Bedrooms" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 Bedroom</SelectItem>
        <SelectItem value="2">2 Bedrooms</SelectItem>
        <SelectItem value="3">3 Bedrooms</SelectItem>
        <SelectItem value="4">4+ Bedrooms</SelectItem>
      </SelectContent>
    </Select>
  );
};