import { Link } from "react-router-dom";

export const LegalLinks = () => {
  return (
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
  );
};