import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Home,
  Building2,
  Phone,
  MessageCircle,
  BedDouble,
  Bath,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string; // Changed from number to string to match UUID from Supabase
    title: string;
    location: string;
    price: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    image: string;
    status?: "available" | "occupied" | "maintenance";
    amenities?: string[];
    whatsapp?: string;
    phone?: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
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

  const getStatusColor = (status?: string) => {
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
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge variant="secondary" className="bg-white/90">
              {property.type}
            </Badge>
            {property.status && (
              <Badge className={cn("capitalize", getStatusColor(property.status))}>
                {property.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-2" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2" />
              {property.bathrooms} bath
            </div>
          </div>

          {property.amenities && (
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {amenity}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xl font-bold text-primary">
              {property.price} FCFA
            </div>
            <div className="flex gap-2">
              {property.whatsapp && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="text-green-600 hover:text-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              )}
              {property.phone && (
                <Button size="sm" onClick={handleCall}>
                  <Phone className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;