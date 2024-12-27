import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApprovalActions } from "./ApprovalActions";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  status: PropertyStatus;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

interface ApprovalsTableProps {
  properties: Property[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalsTable = ({ properties, onApprove, onReject }: ApprovalsTableProps) => {
  if (!properties.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No properties pending approval
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties?.map((property) => (
          <TableRow key={property.id}>
            <TableCell className="font-medium">{property.title}</TableCell>
            <TableCell>
              {property.profiles.first_name} {property.profiles.last_name}
            </TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>{new Date(property.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant="secondary">
                {property.status}
              </Badge>
            </TableCell>
            <TableCell>
              <ApprovalActions
                propertyId={property.id}
                onApprove={onApprove}
                onReject={onReject}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};