import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PropertyBadges } from "./property/card/PropertyBadges";
import { PropertyDetails } from "./property/card/PropertyDetails";
import { PropertyActions } from "./property/card/PropertyActions";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    image: string;
    status?: PropertyStatus;
    amenities?: string[];
    whatsapp?: string;
    phone?: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (property.whatsapp) {
      const message = `Hello, I'm interested in your property: ${property.title}`;
      window.open(
        `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    if (property.phone) {
      window.location.href = `tel:${property.phone}`;
    }
  };

  const handleImageError = () => {
    console.error('Image failed to load:', property.image);
    setImageError(true);
  };

  // Use a placeholder image if the property image is not available or failed to load
  const imageUrl = imageError || !property.image ? "/placeholder.svg" : property.image;

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={imageUrl}
            alt={property.title}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            onError={handleImageError}
          />
          <PropertyBadges type={property.type} status={property.status} />
        </div>
        <div className="p-6 space-y-4">
          <PropertyDetails
            title={property.title}
            location={property.location}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            amenities={property.amenities}
          />
          <PropertyActions
            price={property.price}
            whatsapp={property.whatsapp}
            phone={property.phone}
            onWhatsAppClick={handleWhatsApp}
            onCallClick={handleCall}
          />
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;