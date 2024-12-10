import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminNav from "./AdminNav";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        toast.error("Please login to access the admin dashboard");
        navigate("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        toast.error("You don't have permission to access this area");
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="mr-8">
            <h2 className="text-lg font-semibold">Bayele Admin</h2>
          </div>
          <AdminNav />
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              title="Back to Home"
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;