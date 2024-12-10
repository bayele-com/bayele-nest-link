import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";

interface PropertyBadgesProps {
  type: string;
  status?: PropertyStatus;
}

export const PropertyBadges = ({ type, status }: PropertyBadgesProps) => {
  const getStatusColor = (status?: PropertyStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500";
      case "occupied":
        return "bg-red-500/10 text-red-500";
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500";
      case "pending":
        return "bg-blue-500/10 text-blue-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-green-500/10 text-green-500";
    }
  };

  const shouldShowStatus = (status?: PropertyStatus) => {
    return status === "available" || status === "occupied" || status === "maintenance";
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <Badge variant="secondary" className="bg-white/90">
        {type}
      </Badge>
      {status && shouldShowStatus(status) && (
        <Badge className={cn("capitalize", getStatusColor(status))}>
          {status}
        </Badge>
      )}
    </div>
  );
};