import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface PropertyContactButtonsProps {
  phone: string;
  whatsapp: string;
  title: string;
}

const PropertyContactButtons = ({ phone, whatsapp, title }: PropertyContactButtonsProps) => {
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
    toast.success("Initiating call...");
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your property: ${title}`;
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  return (
    <div className="space-y-3">
      <Button onClick={handleCall} className="w-full">
        <Phone className="mr-2 h-4 w-4" />
        Call Now
      </Button>
      <Button onClick={handleWhatsApp} variant="outline" className="w-full">
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  );
};

export default PropertyContactButtons;