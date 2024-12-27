import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import BayeleStay from "./pages/BayeleStay";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyManagement from "./pages/PropertyManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProperties from "./pages/AdminProperties";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import UserProfile from "./pages/UserProfile";
import WhatsAppButton from "./components/chat/WhatsAppButton";
import FlashBanner from "./components/FlashBanner";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/stay" element={<BayeleStay />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/manage" element={<PropertyManagement />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <React.StrictMode>
            <TooltipProvider>
              <FlashBanner />
              <AppRoutes />
              <WhatsAppButton />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </React.StrictMode>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;