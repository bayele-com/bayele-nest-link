import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyContactButtons from "@/components/property/PropertyContactButtons";

const PropertyDetail = () => {
  const { id } = useParams();
  
  // This would normally come from an API call using the id
  const property = {
    id: 1,
    title: "Modern Apartment in Bastos",
    description: "Beautiful and spacious apartment located in the heart of Bastos. Features modern amenities and a stunning view of the city.",
    location: "Bastos, Yaoundé",
    price: "350,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    ],
    features: ["Air Conditioning", "Parking", "Security", "Water Supply"],
    contact: {
      phone: "+237612345678",
      whatsapp: "+237612345678"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="p-4">
            <PropertyImageCarousel 
              images={property.images} 
              title={property.title} 
            />
          </Card>

          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <PropertyDetails
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  description={property.description}
                />
                <PropertyFeatures features={property.features} />
              </div>

              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Contact Property Owner</h3>
                  <PropertyContactButtons
                    phone={property.contact.phone}
                    whatsapp={property.contact.whatsapp}
                    title={property.title}
                  />
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;