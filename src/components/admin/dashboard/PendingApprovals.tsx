import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { PropertyStatus } from "@/integrations/supabase/types/enums";
import { ApprovalsTable } from "./ApprovalsTable";

const PendingApprovals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['pending-properties'],
    queryFn: async () => {
      console.log('Fetching pending properties...');
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
        .eq('status', 'pending' as PropertyStatus)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending properties:', error);
        throw error;
      }
      
      console.log('Pending properties fetched:', data);
      return data;
    }
  });

  const updatePropertyStatus = useMutation({
    mutationFn: async ({ propertyId, status }: { propertyId: string, status: PropertyStatus }) => {
      console.log('Updating property status:', { propertyId, status });
      const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', propertyId);

      if (error) {
        console.error('Error updating property status:', error);
        throw error;
      }
      console.log('Property status updated successfully');
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
      console.error('Error approving property:', error);
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
      console.error('Error rejecting property:', error);
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
      <ApprovalsTable
        properties={properties || []}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default PendingApprovals;