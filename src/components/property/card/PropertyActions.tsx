import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

interface PropertyActionsProps {
  price: string;
  whatsapp?: string | null;
  phone?: string | null;
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
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-primary">{price}</p>
      </div>
      <div className="flex gap-2">
        {whatsapp && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={onWhatsAppClick}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        )}
        {phone && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCallClick}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
        )}
      </div>
    </div>
  );
};