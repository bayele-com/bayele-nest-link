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

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    properties: 3,
    joinedAt: "2024-02-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "owner",
    properties: 2,
    joinedAt: "2024-03-01",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
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
                    <Button variant="outline" size="icon">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.properties}</TableCell>
                <TableCell>{user.joinedAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;