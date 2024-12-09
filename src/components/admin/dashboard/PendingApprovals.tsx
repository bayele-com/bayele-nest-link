import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Bastos",
    owner: "John Doe",
    status: "pending",
    type: "Apartment",
    location: "Bastos, Yaoundé",
    submittedAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    owner: "Jane Smith",
    status: "approved",
    type: "Villa",
    location: "Bonanjo, Douala",
    submittedAt: "2024-03-14",
  },
];

const PendingApprovals = () => {
  const { toast } = useToast();

  const handleApprove = (propertyId: number) => {
    toast({
      title: "Property Approved",
      description: "The property has been approved and is now live.",
    });
  };

  const handleReject = (propertyId: number) => {
    toast({
      title: "Property Rejected",
      description: "The property has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pending Approvals</h2>
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
          {mockProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.owner}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{property.submittedAt}</TableCell>
              <TableCell>
                <Badge
                  variant={property.status === "approved" ? "default" : "secondary"}
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleApprove(property.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleReject(property.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingApprovals;