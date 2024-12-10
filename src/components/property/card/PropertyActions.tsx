import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

interface PropertyActionsProps {
  price: string;
  whatsapp?: string;
  phone?: string;
  onWhatsAppClick: (e: React.MouseEvent) => void;
  onCallClick: (e: React.MouseEvent) => void;
}

export const PropertyActions = ({
  price,
  whatsapp,
  phone,
  onWhatsAppClick,
  onCallClick,
}: PropertyActionsProps) => {
  return (
    <div className="flex items-center justify-between pt-2 border-t">
      <div className="text-xl font-bold text-primary">
        {price} FCFA
      </div>
      <div className="flex gap-2">
        {whatsapp && (
          <Button
            size="sm"
            variant="outline"
            onClick={onWhatsAppClick}
            className="text-green-600 hover:text-green-700"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        )}
        {phone && (
          <Button size="sm" onClick={onCallClick}>
            <Phone className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};