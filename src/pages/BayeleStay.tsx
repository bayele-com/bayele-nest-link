import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { City, PropertyStatus, PropertyType } from "@/integrations/supabase/types/enums";
import { supabase } from "@/lib/supabase";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import { SEO } from "@/components/SEO";
import { BayeleStayHero } from "@/components/bayele-stay/BayeleStayHero";
import { CityToggle } from "@/components/bayele-stay/CityToggle";
import { FeaturedProperties } from "@/components/bayele-stay/FeaturedProperties";
import { HowItWorks } from "@/components/bayele-stay/HowItWorks";
import { PropertyGrid } from "@/components/bayele-stay/PropertyGrid";

const BayeleStay = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<City>(City.YAOUNDE);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["furnished-properties", selectedCity],
    queryFn: async () => {
      console.log("Fetching furnished properties for city:", selectedCity);
      
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("type", PropertyType.FURNISHED)
        .eq("city", selectedCity.toLowerCase())
        .eq("status", PropertyStatus.AVAILABLE)
        .order("is_featured", { ascending: false });

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t(`meta.${selectedCity.toLowerCase()}.title`)}
        description={t(`meta.${selectedCity.toLowerCase()}.description`)}
      />
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