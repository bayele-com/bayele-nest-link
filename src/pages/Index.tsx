import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Home, Building2, Phone } from "lucide-react";
import { PropertyFilters, FilterValues } from "@/components/PropertyFilters";
import PropertyCard from "@/components/PropertyCard";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/integrations/supabase/types";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";

type Property = Tables<"properties">;

const Index = () => {
  const [filters, setFilters] = useState<FilterValues>({
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("status", "available" as PropertyStatus);

      if (filters.city) {
        query = query.eq("city", filters.city.toLowerCase());
      }
      if (filters.propertyType) {
        query = query.eq("type", filters.propertyType.toLowerCase());
      }
      if (filters.minPrice) {
        query = query.gte("price", parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte("price", parseFloat(filters.maxPrice));
      }
      if (filters.bedrooms) {
        query = query.eq("bedrooms", parseInt(filters.bedrooms));
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }
      
      return data;
    },
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1460925895917-afdab827c52f)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-16">
          <div className="text-center animate-fade-down">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect Home in Cameroon
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover properties that match your lifestyle
            </p>

            <div className="max-w-4xl mx-auto">
              <PropertyFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Available Properties</h2>
            <p className="text-muted-foreground">
              {isLoading ? "Loading properties..." : `${properties?.length || 0} properties found`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property) => (
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;