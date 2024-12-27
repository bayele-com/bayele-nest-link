import { Link } from "react-router-dom";

export const PropertyLinks = () => {
  return (
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
  );
};