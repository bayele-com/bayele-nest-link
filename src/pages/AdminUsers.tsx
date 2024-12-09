import { Input } from "@/components/ui/input";
import AddUserDialog from "@/components/admin/users/AddUserDialog";
import UserStats from "@/components/admin/users/UserStats";
import UsersTable from "@/components/admin/users/UsersTable";

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <AddUserDialog />
      </div>

      <UserStats />

      <div className="flex gap-4">
        <Input 
          placeholder="Search users..." 
          className="max-w-sm"
        />
      </div>

      <UsersTable />
    </div>
  );
};

export default AdminUsers;