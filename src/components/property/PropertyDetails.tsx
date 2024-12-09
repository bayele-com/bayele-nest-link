import { MapPin, Home, Bath } from "lucide-react";

interface PropertyDetailsProps {
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
}

const PropertyDetails = ({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  description,
}: PropertyDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {price} FCFA/month
        </h2>
        <div className="flex gap-4 text-muted-foreground">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            {bedrooms} bed
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-2" />
            {bathrooms} bath
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;