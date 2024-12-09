import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Home, Building2, Search } from "lucide-react";

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
    onFilterChange(newFilters);
  };

  return (
    <div className="glass-card p-4 rounded-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          value={filters.city}
          onValueChange={(value) => handleFilterChange("city", value)}
        >
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

        <Select
          value={filters.propertyType}
          onValueChange={(value) => handleFilterChange("propertyType", value)}
        >
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

        <Input
          type="number"
          placeholder="Min Price (FCFA)"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          className="w-full"
        />

        <Input
          type="number"
          placeholder="Max Price (FCFA)"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          className="w-full"
        />

        <Select
          value={filters.bedrooms}
          onValueChange={(value) => handleFilterChange("bedrooms", value)}
        >
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
      </div>

      <div className="flex justify-end">
        <Button className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search Properties
        </Button>
      </div>
    </div>
  );
}