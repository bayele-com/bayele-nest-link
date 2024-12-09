import AnalyticsDashboard from "@/components/admin/dashboard/AnalyticsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Properties", value: "120" },
    { title: "Active Listings", value: "85" },
    { title: "Total Users", value: "450" },
    { title: "Monthly Views", value: "2.4K" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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