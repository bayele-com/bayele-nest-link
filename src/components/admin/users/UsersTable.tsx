import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Lock, Trash2, Unlock } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  properties: number;
  joinedAt: string;
}

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    status: "active",
    properties: 3,
    joinedAt: "2024-02-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    properties: 0,
    joinedAt: "2024-03-01",
  },
];

const UsersTable = () => {
  const { toast } = useToast();

  const handleStatusChange = (userId: number, newStatus: string) => {
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `User status has been updated to ${newStatus}.`,
    });
  };

  const handleDelete = (userId: number) => {
    toast({
      title: "User deleted",
      description: "User has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.properties}</TableCell>
            <TableCell>{user.joinedAt}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={user.status === "active" ? "text-red-500" : "text-green-500"}
                  onClick={() => handleStatusChange(user.id, user.status === "active" ? "inactive" : "active")}
                >
                  {user.status === "active" ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;