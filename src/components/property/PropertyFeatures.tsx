import { CheckCircle2 } from "lucide-react";

interface PropertyFeaturesProps {
  title: string;
  features: string[];
}

const PropertyFeatures = ({ title, features }: PropertyFeaturesProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;