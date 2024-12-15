import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { City, PropertyStatus, PropertyType } from "@/integrations/supabase/types/enums";
import { supabase } from "@/lib/supabase";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import { BayeleStayHero } from "@/components/bayele-stay/BayeleStayHero";
import { CityToggle } from "@/components/bayele-stay/CityToggle";
import { FeaturedProperties } from "@/components/bayele-stay/FeaturedProperties";
import { HowItWorks } from "@/components/bayele-stay/HowItWorks";
import { PropertyGrid } from "@/components/bayele-stay/PropertyGrid";

const BayeleStay = () => {
  const [selectedCity, setSelectedCity] = useState<City>(City.YAOUNDE);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["furnished-properties", selectedCity],
    queryFn: async () => {
      console.log("Fetching properties for city:", selectedCity);
      console.log("Using property type:", PropertyType.FURNISHED);
      console.log("Using status:", PropertyStatus.AVAILABLE);
      
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("type", PropertyType.FURNISHED)
        .eq("city", selectedCity.toLowerCase())
        .eq("status", PropertyStatus.AVAILABLE)
        .eq("management_type", "bayele")
        .order("is_featured", { ascending: false });

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data;
    },
    retry: 3, // Retry failed requests 3 times
    retryDelay: 1000, // Wait 1 second between retries
  });

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <BayeleStayHero />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <CityToggle 
          selectedCity={selectedCity} 
          onCityChange={setSelectedCity} 
        />

        <FeaturedProperties properties={properties} isLoading={isLoading} />
        
        <HowItWorks />
        
        <PropertyGrid properties={properties} isLoading={isLoading} />
      </main>

      <Footer />
    </div>
  );
};

export default BayeleStay;