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
    mutationFn: async ({ 
      propertyId, 
      status, 
      reason 
    }: { 
      propertyId: string; 
      status: PropertyStatus; 
      reason?: string;
    }) => {
      const { error: updateError } = await supabase
        .from('properties')
        .update({ 
          status,
          ...(status === 'rejected' && { rejection_reason: reason })
        })
        .eq('id', propertyId);

      if (updateError) throw updateError;

      // Record status change in history
      const { error: historyError } = await supabase
        .from('property_status_history')
        .insert({
          property_id: propertyId,
          previous_status: 'pending',
          new_status: status,
          reason
        });

      if (historyError) throw historyError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-properties'] });
    }
  });

  const handleApprove = async (propertyId: string) => {
    try {
      await updatePropertyStatus.mutateAsync({ 
        propertyId, 
        status: 'available' 
      });
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
      const reason = prompt("Please provide a reason for rejection:");
      if (reason === null) return; // User cancelled

      await updatePropertyStatus.mutateAsync({ 
        propertyId, 
        status: 'rejected',
        reason 
      });
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