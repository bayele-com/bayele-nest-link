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
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Properties awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Properties
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              Currently listed properties
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              Registered users on platform
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
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

      {/* Recent Users */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
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