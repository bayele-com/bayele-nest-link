import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Properties</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/manage" className="text-sm text-muted-foreground hover:text-foreground">
                  List a property
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold">Payment Methods</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• MTN Mobile Money</li>
              <li>• Orange Money</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect with us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/bayele"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/+237673823692"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/bayele"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/bayele"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bayele Immo by Bayele.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;