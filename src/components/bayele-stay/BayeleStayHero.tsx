import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const BayeleStayHero = () => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/8fe0dd91-518b-408d-a1e8-9f840e37bbde.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Experience Comfort in Yaoundé & Douala
        </h1>
        <p className="text-xl text-white/90">
          Discover our curated selection of furnished apartments with daily rates. Professional management by Bayele Stay for your perfect short or long-term stay.
        </p>
        <Link to="/stay/search">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Find Your Stay
          </Button>
        </Link>
      </div>
    </div>
  );
};