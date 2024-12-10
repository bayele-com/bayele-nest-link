import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
import { Eye, Edit2, Trash2, Ban } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import AddPropertyDialog from "@/components/admin/properties/AddPropertyDialog";
import { useNavigate } from "react-router-dom";
import { PropertyStatus } from "@/integrations/supabase/types/enums";

const AdminProperties = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*, profiles(first_name, last_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const deletePropertyMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast.success("Property deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete property");
      console.error('Delete error:', error);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ propertyId, status }: { propertyId: string; status: PropertyStatus }) => {
      const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', propertyId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast.success("Property status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update property status");
      console.error('Update error:', error);
    }
  });

  const handleStatusChange = (propertyId: string, currentStatus: PropertyStatus) => {
    const newStatus = currentStatus === PropertyStatus.AVAILABLE ? PropertyStatus.MAINTENANCE : PropertyStatus.AVAILABLE;
    updateStatusMutation.mutate({ propertyId, status: newStatus });
  };

  const handleDelete = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deletePropertyMutation.mutate(propertyId);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Properties</h1>
        <AddPropertyDialog />
      </div>

      <div className="flex gap-4">
        <Input 
          placeholder="Search properties..." 
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties?.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>
                  {property.profiles?.first_name} {property.profiles?.last_name}
                </TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={property.status === "available" ? "default" : "secondary"}
                  >
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={property.status === "available" ? "text-red-500" : "text-green-500"}
                      onClick={() => handleStatusChange(property.id, property.status as PropertyStatus)}
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
    </div>
  );
};

export default AdminProperties;