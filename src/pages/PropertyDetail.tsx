import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyContactButtons from "@/components/property/PropertyContactButtons";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import { PropertyBookingDetails } from "@/components/property/PropertyBookingDetails";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import type { Property } from "@/integrations/supabase/types/properties";
import { toast } from "sonner";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  const { isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      console.log('Fetching property details for ID:', id);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching property:', error);
        toast.error("Failed to load property details");
        throw error;
      }

      if (!data) {
        console.error('Property not found');
        toast.error("Property not found");
        return null;
      }
      
      console.log('Property details fetched:', data);
      setProperty(data);
      return data;
    },
  });

  // Use a default placeholder image if no images are available
  const defaultImage = "/placeholder.svg";
  const propertyImages = property?.images?.length 
    ? property.images 
    : [defaultImage];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Error loading property</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Property not found</h2>
          <p className="text-muted-foreground">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MainNav />
      <PropertyImageCarousel images={propertyImages} title={property.title} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <PropertyDetails
              title={property.title}
              location={property.location}
              price={property.price.toString()}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area?.toString() || "N/A"}
              description={property.description}
            />
            <PropertyFeatures title="Features" features={property.amenities || []} />
            <PropertyContactButtons
              phone={property.phone || ""}
              whatsapp={property.whatsapp || ""}
              title={property.title}
            />
          </div>
          <div className="lg:col-span-1">
            <PropertyBookingDetails
              price={property.price.toString()}
              whatsapp={property.whatsapp}
              title={property.title}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;