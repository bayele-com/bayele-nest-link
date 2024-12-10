import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlashBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem("hasSeenBanner");
    if (!hasSeenBanner) {
      setIsVisible(true);
      localStorage.setItem("hasSeenBanner", "true");
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center text-center">
        <p className="text-sm sm:text-base">
          <strong>Trouvez une Maison en moin de 72h avec Bayele Immo.</strong>
          <br className="sm:hidden" />
          <span className="sm:ml-2">
            Find a house in less than 72 hours with Bayele Immo.
          </span>
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-primary-foreground/80"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlashBanner;