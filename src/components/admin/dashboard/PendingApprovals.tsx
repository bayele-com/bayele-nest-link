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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";

const PendingApprovals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['pending-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          id,
          title,
          type,
          location,
          status,
          created_at,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const updatePropertyStatus = useMutation({
    mutationFn: async ({ propertyId, status }: { propertyId: string, status: PropertyStatus }) => {
      const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-properties'] });
    }
  });

  const handleApprove = async (propertyId: string) => {
    try {
      await updatePropertyStatus.mutateAsync({ propertyId, status: 'available' });
      toast({
        title: "Property Approved",
        description: "The property has been approved and is now live.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (propertyId: string) => {
    try {
      await updatePropertyStatus.mutateAsync({ propertyId, status: 'rejected' });
      toast({
        title: "Property Rejected",
        description: "The property has been rejected.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject property. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading pending approvals...</div>;
  }

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
