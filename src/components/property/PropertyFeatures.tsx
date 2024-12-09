interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Features</h3>
      <ul className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyFeatures;