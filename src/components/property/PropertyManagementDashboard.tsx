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
import { Edit2, Trash2 } from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Bastos",
    price: "350,000",
    status: "available",
    type: "Apartment",
    location: "Bastos, Yaoundé",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    price: "750,000",
    status: "occupied",
    type: "Villa",
    location: "Bonanjo, Douala",
  },
];

const PropertyManagementDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Properties</h2>
        <Button>Add New Property</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price (FCFA)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell>
                <Badge
                  variant={property.status === "available" ? "default" : "secondary"}
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
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

export default PropertyManagementDashboard;