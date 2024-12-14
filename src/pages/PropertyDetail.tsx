import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyContactButtons from "@/components/property/PropertyContactButtons";
import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { PropertyStatus } from "@/integrations/supabase/types/enums";

const PropertyDetail = () => {
  const { id } = useParams();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      console.log('Fetching property with ID:', id);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        throw error;
      }

      console.log('Fetched property:', data);
      return data as Tables<"properties">;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Error loading property</h2>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Property not found</h2>
            <p className="text-muted-foreground">The property you're looking for doesn't exist</p>
          </div>
        </div>
      </div>
    );
  }

  // Use a default placeholder if no images are available
  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : ['/placeholder.svg'];

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.AVAILABLE:
        return "bg-green-500/10 text-green-500";
      case PropertyStatus.OCCUPIED:
        return "bg-red-500/10 text-red-500";
      case PropertyStatus.MAINTENANCE:
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-green-500/10 text-green-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="p-4">
            <PropertyImageCarousel 
              images={propertyImages}
              title={property.title} 
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.location}
                    </div>
                  </div>
                  <Badge className={cn("capitalize", getStatusColor(property.status || PropertyStatus.AVAILABLE))}>
                    {property.status || PropertyStatus.AVAILABLE}
                  </Badge>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="text-2xl font-bold text-primary">
                    {property.price.toLocaleString()} FCFA<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available now
                  </div>
                </div>

                <Separator className="my-4" />

                <PropertyDetails
                  title={property.title}
                  location={property.location}
                  price={property.price.toLocaleString()}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area?.toString() || "N/A"}
                  description={property.description}
                />
              </Card>

              {property.amenities && property.amenities.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                  <PropertyFeatures 
                    title="Property Features" 
                    features={property.amenities} 
                  />
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-semibold mb-4">Contact Property Owner</h3>
                <PropertyContactButtons
                  phone={property.phone || ''}
                  whatsapp={property.whatsapp || ''}
                  title={property.title}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;