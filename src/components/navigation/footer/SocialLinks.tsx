import { Facebook, Linkedin, Twitter, MessageSquare } from "lucide-react";

export const SocialLinks = () => {
  return (
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
  );
};