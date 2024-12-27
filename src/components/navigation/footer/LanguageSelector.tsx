import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const LanguageSelector = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-2">
        <Globe className="h-4 w-4" />
        <span>EN</span>
      </Button>
      <Separator orientation="vertical" className="h-4" />
      <Button variant="ghost" size="sm">
        FR
      </Button>
    </div>
  );
};