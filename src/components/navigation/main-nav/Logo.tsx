import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/a10b5bad-4289-4777-874e-0f1f910995f4.png" 
        alt="Bayele Immo" 
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold text-bayele-500 hidden sm:inline">Immo</span>
    </Link>
  );
};