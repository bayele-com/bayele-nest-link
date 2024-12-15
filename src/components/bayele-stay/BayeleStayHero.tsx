import { Button } from "@/components/ui/button";

export const BayeleStayHero = () => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/c01e7f0e-e190-40b0-aa8c-7fe4d9c747ad.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Book your perfect stay in Yaoundé or Douala
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          We handle everything, so you don't have to. Managed by Bayele Stay for your comfort and peace of mind.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Explore Available Stays
        </Button>
      </div>
    </div>
  );
};