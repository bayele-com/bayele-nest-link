import StatsOverview from "./dashboard/StatsOverview";
import PendingApprovals from "./dashboard/PendingApprovals";
import RecentUsers from "./dashboard/RecentUsers";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <StatsOverview />
      <PendingApprovals />
      <RecentUsers />
    </div>
  );
};

export default AdminDashboard;