import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, Phone, Home, Bath, WhatsApp } from "lucide-react";

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

  const handleCall = () => {
    window.location.href = `tel:${property.contact.phone}`;
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your property: ${property.title}`;
    const whatsappUrl = `https://wa.me/${property.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Image Carousel */}
          <Card className="p-4">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Card>

          {/* Property Details */}
          <Card className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {property.location}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {property.price} FCFA/month
                  </h2>
                  <div className="flex gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      {property.bedrooms} bed
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-2" />
                      {property.bathrooms} bath
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Contact Property Owner</h3>
                  <div className="space-y-3">
                    <Button onClick={handleCall} className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                    <Button onClick={handleWhatsApp} variant="outline" className="w-full">
                      <WhatsApp className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
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