import { Separator } from "@/components/ui/separator";
import { CompanyLinks } from "./footer/CompanyLinks";
import { PropertyLinks } from "./footer/PropertyLinks";
import { LegalLinks } from "./footer/LegalLinks";
import { PaymentMethods } from "./footer/PaymentMethods";
import { SocialLinks } from "./footer/SocialLinks";
import { LanguageSelector } from "./footer/LanguageSelector";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <CompanyLinks />
          <PropertyLinks />
          <LegalLinks />
          <PaymentMethods />
          <SocialLinks />
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <LanguageSelector />
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bayele Immo by Bayele.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;