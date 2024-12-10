import { Home, Users, Building, Settings } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Building,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const AdminNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <NavigationMenu className="max-w-none w-full justify-start">
      <NavigationMenuList className="space-x-2">
        {adminNavItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link to={item.href}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isActive(item.href) &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AdminNav;