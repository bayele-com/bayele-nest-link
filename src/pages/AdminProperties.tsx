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
import { Eye, Edit2, Trash2, Plus, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PropertyListingForm from "@/components/property/PropertyListingForm";

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
  const { toast } = useToast();

  const handleStatusChange = (propertyId: number, newStatus: string) => {
    toast({
      title: `Property ${newStatus}`,
      description: `Property has been ${newStatus} successfully.`,
    });
  };

  const handleDelete = (propertyId: number) => {
    toast({
      title: "Property deleted",
      description: "Property has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Create a new property listing. Fill in all the required information below.
              </DialogDescription>
            </DialogHeader>
            <PropertyListingForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input 
          placeholder="Search properties..." 
          className="max-w-sm"
        />
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleStatusChange(property.id, "unlisted")}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDelete(property.id)}
                  >
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