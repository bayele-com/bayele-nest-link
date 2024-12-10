import { MapPin, BedDouble, Bath, CheckCircle2 } from "lucide-react";

interface PropertyDetailsProps {
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities?: string[];
}

export const PropertyDetails = ({ 
  title, 
  location, 
  bedrooms, 
  bathrooms, 
  amenities 
}: PropertyDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center">
          <BedDouble className="h-4 w-4 mr-2" />
          {bedrooms} bed
        </div>
        <div className="flex items-center">
          <Bath className="h-4 w-4 mr-2" />
          {bathrooms} bath
        </div>
      </div>

      {amenities && (
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => (
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
    </div>
  );
};