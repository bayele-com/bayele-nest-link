import AdminNav from "./AdminNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="mr-8">
            <h2 className="text-lg font-semibold">Bayele Admin</h2>
          </div>
          <AdminNav />
        </div>
      </header>
      <main className="container px-4 py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;