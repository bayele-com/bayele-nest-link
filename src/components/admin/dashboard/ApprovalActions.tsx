import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface ApprovalActionsProps {
  propertyId: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalActions = ({ propertyId, onApprove, onReject }: ApprovalActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onApprove(propertyId)}
      >
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onReject(propertyId)}
      >
        <XCircle className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};