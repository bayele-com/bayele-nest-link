import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "+4915258399239";
  const message = encodeURIComponent("Hello! I'm interested in learning more about Bayele Immo.");

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg z-50 flex items-center justify-center"
      size="icon"
      title="Chat on WhatsApp"
    >
      <MessageSquare className="h-6 w-6 text-white" />
    </Button>
  );
};

export default WhatsAppButton;