import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyContactButtons from "@/components/property/PropertyContactButtons";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import type { Property } from "@/integrations/supabase/types";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property: {error.message}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <MainNav />
      <PropertyImageCarousel images={property.images || []} title={property.title} />
      <div className="container mx-auto px-4 py-8">
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
          phone={property.phone}
          whatsapp={property.whatsapp}
          title={property.title}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;