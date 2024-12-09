import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyContactButtons from "@/components/property/PropertyContactButtons";
import { MapPin, Calendar } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  
  // This would normally come from an API call using the id
  const property = {
    id: 1,
    title: "Modern Apartment in Bastos",
    description: "Beautiful and spacious apartment located in the heart of Bastos. Features modern amenities and a stunning view of the city. This property offers the perfect blend of comfort and convenience, with easy access to local shops, restaurants, and transportation.",
    location: "Bastos, Yaoundé",
    price: "350,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    status: "available",
    area: "150",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    ],
    features: [
      "Air Conditioning",
      "Parking",
      "24/7 Security",
      "Water Supply",
      "Backup Generator",
      "Modern Kitchen",
      "Balcony",
      "High-Speed Internet"
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Children's Play Area",
      "Visitor Parking"
    ],
    contact: {
      phone: "+237612345678",
      whatsapp: "+237612345678"
    },
    availableFrom: "2024-03-01"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500";
      case "occupied":
        return "bg-red-500/10 text-red-500";
      case "maintenance":
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
              images={property.images} 
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
                  <Badge className={cn("capitalize", getStatusColor(property.status))}>
                    {property.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="text-2xl font-bold text-primary">
                    {property.price} FCFA<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available from {new Date(property.availableFrom).toLocaleDateString()}
                  </div>
                </div>

                <Separator className="my-4" />

                <PropertyDetails
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  description={property.description}
                />
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                <div className="space-y-6">
                  <PropertyFeatures 
                    title="Property Features" 
                    features={property.features} 
                  />
                  <Separator />
                  <PropertyFeatures 
                    title="Building Amenities" 
                    features={property.amenities} 
                  />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="font-semibold mb-4">Contact Property Owner</h3>
                <PropertyContactButtons
                  phone={property.contact.phone}
                  whatsapp={property.contact.whatsapp}
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