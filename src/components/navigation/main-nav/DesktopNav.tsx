import { Link } from "react-router-dom";
import { LogIn, List } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const DesktopNav = () => {
  const { user } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/stay">
              <Button variant="ghost">Bayele Stay</Button>
            </Link>
          </NavigationMenuItem>

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
  );
};