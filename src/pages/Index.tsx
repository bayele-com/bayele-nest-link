import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Home, Building2, Phone } from "lucide-react";
import { PropertyFilters, FilterValues } from "@/components/PropertyFilters";

const properties = [
  {
    id: 1,
    title: "Modern Apartment in Bastos",
    location: "Bastos, Yaoundé",
    price: "350,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Bonanjo, Douala",
    price: "750,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    id: 3,
    title: "Cozy Studio in City Center",
    location: "Centre, Yaoundé",
    price: "150,000",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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
    // Here we would typically fetch filtered properties
  };

  return (
    <div className="min-h-screen">
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

        <div className="container relative z-10 mx-auto px-4">
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
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">
              Explore our hand-picked properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="property-card">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="property-image"
                  />
                  <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="sm">
                      {property.type}
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        {property.bedrooms} bed
                      </div>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        {property.bathrooms} bath
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-primary">
                      {property.price} FCFA
                    </div>
                    <Button>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;