import { Check } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Properties",
      description: "Choose a stay in Yaoundé or Douala",
    },
    {
      title: "Select & Contact",
      description: "Click the "Book via WhatsApp" button",
    },
    {
      title: "Talk to an Agent",
      description: "Our Bayele Stay agents will confirm your booking",
    },
    {
      title: "Booking Confirmed",
      description: "Your stay is ready. Pack your bags and get ready to go!",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-secondary/50"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};