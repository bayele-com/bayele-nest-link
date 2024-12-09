import { MapPin, Home, Bath, Maximize } from "lucide-react";

interface PropertyDetailsProps {
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
}

const PropertyDetails = ({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  description,
}: PropertyDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
          <Home className="h-5 w-5 mb-2 text-primary" />
          <span className="text-sm text-muted-foreground">Bedrooms</span>
          <span className="font-semibold">{bedrooms}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
          <Bath className="h-5 w-5 mb-2 text-primary" />
          <span className="text-sm text-muted-foreground">Bathrooms</span>
          <span className="font-semibold">{bathrooms}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
          <Maximize className="h-5 w-5 mb-2 text-primary" />
          <span className="text-sm text-muted-foreground">Area</span>
          <span className="font-semibold">{area} m²</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;