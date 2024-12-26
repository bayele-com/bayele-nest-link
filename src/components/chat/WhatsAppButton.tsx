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
      className="fixed bottom-6 right-6 rounded-full px-6 py-3 bg-green-500 hover:bg-green-600 shadow-lg z-50 flex items-center gap-2"
      title="Chat on WhatsApp"
    >
      <MessageSquare className="h-5 w-5 text-white" />
      <span className="text-white">Parler à un agent</span>
    </Button>
  );
};

export default WhatsAppButton;