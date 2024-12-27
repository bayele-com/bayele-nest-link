import { Link } from "react-router-dom";
import { LogIn, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const { user } = useAuth();

  return (
    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <img 
            src="/lovable-uploads/a10b5bad-4289-4777-874e-0f1f910995f4.png" 
            alt="Bayele Immo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-bayele-500">Immo</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex flex-col space-y-4 p-4">
        <Link to="/stay" className="text-sm font-medium">
          Bayele Stay
        </Link>
        <div className="space-y-2">
          <h4 className="text-sm font-medium leading-none">For Property Owners</h4>
          <p className="text-sm text-muted-foreground">
            List your property and reach thousands of potential tenants
          </p>
        </div>
        <Link to="/manage" className="w-full">
          <Button variant="outline" className="w-full gap-2">
            <List className="h-4 w-4" />
            List a property
          </Button>
        </Link>
        {!user ? (
          <>
            <Link to="/auth/login" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <LogIn className="h-4 w-4" />
                Log In
              </Button>
            </Link>
            <Link to="/auth/register" className="w-full">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </>
        ) : (
          <Link to="/admin" className="w-full">
            <Button className="w-full">Dashboard</Button>
          </Link>
        )}
      </div>
    </SheetContent>
  );
};