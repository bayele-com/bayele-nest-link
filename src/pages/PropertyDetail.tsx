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

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      console.log('Fetching property details for ID:', id);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        throw error;
      }
      
      console.log('Property details fetched:', data);
      return data;
    },
    meta: {
      onSettled: (data) => {
        if (data) {
          setProperty(data);
        }
      }
    }
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error loading property: {error.message}</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

  // Use placeholder image if no images are available
  const propertyImages = property.images?.length ? property.images : ["/placeholder.svg"];

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