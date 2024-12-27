import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Logo } from "./main-nav/Logo";
import { DesktopNav } from "./main-nav/DesktopNav";
import { MobileNav } from "./main-nav/MobileNav";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <DesktopNav />
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNav;