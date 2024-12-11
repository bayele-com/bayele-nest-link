import { Input } from "@/components/ui/input";

interface PriceInputsProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const PriceInputs = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceInputsProps) => {
  return (
    <>
      <Input
        type="number"
        placeholder="Min Price (FCFA)"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
        className="w-full"
      />
      <Input
        type="number"
        placeholder="Max Price (FCFA)"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        className="w-full"
      />
    </>
  );
};