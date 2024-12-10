import { Link } from "react-router-dom";
import { LogIn, List, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const MobileMenu = () => (
    <div className="flex flex-col space-y-4 p-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-none">For Property Owners</h4>
        <p className="text-sm text-muted-foreground">
          List your property and reach thousands of potential tenants
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-none">For Tenants</h4>
        <p className="text-sm text-muted-foreground">
          Find your perfect home with our easy search tools
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
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a10b5bad-4289-4777-874e-0f1f910995f4.png" 
            alt="Bayele Immo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-bayele-500 hidden sm:inline">Immo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>How it works</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium leading-none">For Property Owners</h4>
                        <p className="text-sm text-muted-foreground">
                          List your property and reach thousands of potential tenants
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium leading-none">For Tenants</h4>
                        <p className="text-sm text-muted-foreground">
                          Find your perfect home with our easy search tools
                        </p>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/manage">
                  <Button variant="ghost" className="gap-2">
                    <List className="h-4 w-4" />
                    List a property
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <Link to="/admin">
                <Button>Dashboard</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
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
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNav;