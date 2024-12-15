import { City } from "@/integrations/supabase/types/enums";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MapPin } from "lucide-react";

interface CityToggleProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export const CityToggle = ({ selectedCity, onCityChange }: CityToggleProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-center">Choose your city</h2>
      <ToggleGroup
        type="single"
        value={selectedCity}
        onValueChange={(value) => value && onCityChange(value as City)}
        className="grid grid-cols-2 w-full max-w-md gap-4"
      >
        <ToggleGroupItem
          value={City.YAOUNDE}
          className="flex items-center justify-center gap-2 p-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <MapPin className="h-4 w-4" />
          Yaoundé
        </ToggleGroupItem>
        <ToggleGroupItem
          value={City.DOUALA}
          className="flex items-center justify-center gap-2 p-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <MapPin className="h-4 w-4" />
          Douala
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};