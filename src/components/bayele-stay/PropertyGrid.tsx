import { Property } from "@/integrations/supabase/types/properties";
import PropertyCard from "@/components/PropertyCard";

interface PropertyGridProps {
  properties?: Property[];
  isLoading: boolean;
}

export const PropertyGrid = ({ properties, isLoading }: PropertyGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={{
            id: property.id,
            title: property.title,
            location: property.location,
            price: property.price.toString(),
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            image: property.images?.[0] || "/placeholder.svg",
            status: property.status || "available",
            amenities: property.amenities || [],
            whatsapp: property.whatsapp,
            phone: property.phone,
          }}
        />
      ))}
    </div>
  );
};