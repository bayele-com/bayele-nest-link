import { Property } from "@/integrations/supabase/types/properties";
import PropertyCard from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedPropertiesProps {
  properties?: Property[];
  isLoading: boolean;
}

export const FeaturedProperties = ({ properties, isLoading }: FeaturedPropertiesProps) => {
  const featuredProperties = properties?.filter(p => p.is_featured) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Stays</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!featuredProperties.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Featured Stays</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredProperties.map((property) => (
            <CarouselItem key={property.id} className="md:basis-1/3">
              <PropertyCard
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};