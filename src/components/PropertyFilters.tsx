import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { CitySelect } from "./property/filters/CitySelect";
import { PropertyTypeSelect } from "./property/filters/PropertyTypeSelect";
import { BedroomsSelect } from "./property/filters/BedroomsSelect";
import { PriceInputs } from "./property/filters/PriceInputs";

export type FilterValues = {
  city: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
};

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    console.log("Applying filters:", filters);
    onFilterChange(filters);
  };

  return (
    <div className="glass-card p-4 rounded-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <CitySelect
          value={filters.city}
          onChange={(value) => handleFilterChange("city", value)}
        />
        <PropertyTypeSelect
          value={filters.propertyType}
          onChange={(value) => handleFilterChange("propertyType", value)}
        />
        <PriceInputs
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => handleFilterChange("minPrice", value)}
          onMaxPriceChange={(value) => handleFilterChange("maxPrice", value)}
        />
        <BedroomsSelect
          value={filters.bedrooms}
          onChange={(value) => handleFilterChange("bedrooms", value)}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSearch} className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search Properties
        </Button>
      </div>
    </div>
  );
}