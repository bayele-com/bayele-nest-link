import { Link } from "react-router-dom";

export const CompanyLinks = () => {
  return (
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
  );
};