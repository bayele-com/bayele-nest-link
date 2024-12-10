import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AnalyticsDashboard from "@/components/admin/dashboard/AnalyticsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [propertiesResponse, usersResponse] = await Promise.all([
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);

      const activeProperties = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');

      return {
        totalProperties: propertiesResponse.count || 0,
        activeListings: activeProperties.count || 0,
        totalUsers: usersResponse.count || 0,
        monthlyViews: '2.4K' // This would need a separate analytics integration
      };
    }
  });

  const defaultStats = {
    totalProperties: 0,
    activeListings: 0,
    totalUsers: 0,
    monthlyViews: '0'
  };

  const displayStats = stats || defaultStats;

  const statCards = [
    { title: "Total Properties", value: displayStats.totalProperties.toString() },
    { title: "Active Listings", value: displayStats.activeListings.toString() },
    { title: "Total Users", value: displayStats.totalUsers.toString() },
    { title: "Monthly Views", value: displayStats.monthlyViews },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnalyticsDashboard />
    </div>
  );
};

export default AdminDashboard;