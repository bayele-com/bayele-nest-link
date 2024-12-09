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
import { Eye, Edit2, Trash2 } from "lucide-react";

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

const AdminProperties = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button>Add New Property</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
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
              <TableCell>
                <Badge
                  variant={property.status === "approved" ? "default" : "secondary"}
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell>{property.submittedAt}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
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

export default AdminProperties;