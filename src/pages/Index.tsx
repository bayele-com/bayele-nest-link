import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Home, Building2, Phone } from "lucide-react";
import { PropertyFilters, FilterValues } from "@/components/PropertyFilters";
import PropertyCard from "@/components/PropertyCard";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";

const properties = [
  {
    id: 1,
    title: "Modern Apartment in Bastos",
    location: "Bastos, Yaoundé",
    price: "350,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    status: "available" as const,
    amenities: ["Air Conditioning", "Parking", "Security"],
    whatsapp: "237612345678",
    phone: "237612345678",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Bonanjo, Douala",
    price: "750,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    status: "maintenance" as const,
    amenities: ["Pool", "Garden", "Security", "Garage"],
    whatsapp: "237612345678",
    phone: "237612345678",
  },
  {
    id: 3,
    title: "Cozy Studio in City Center",
    location: "Centre, Yaoundé",
    price: "150,000",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    status: "occupied" as const,
    amenities: ["Furnished", "Internet", "Water Supply"],
    whatsapp: "237612345678",
    phone: "237612345678",
  },
];

const Index = () => {
  const [filters, setFilters] = useState<FilterValues>({
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
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

      {/* Featured Properties - Added margin-top for proper spacing */}
      <section className="py-20 bg-secondary -mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">
              Explore our hand-picked properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
