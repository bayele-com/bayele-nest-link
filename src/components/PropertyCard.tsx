import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Building2, Phone } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    image: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="property-card">
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
    </Link>
  );
};

export default PropertyCard;