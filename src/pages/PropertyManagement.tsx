import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyListingForm from "@/components/property/PropertyListingForm";
import PropertyManagementDashboard from "@/components/property/PropertyManagementDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PropertyManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {user ? "Property Management" : "Submit a Property"}
      </h1>
      
      {user ? (
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="new-listing">New Listing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <PropertyManagementDashboard />
          </TabsContent>
          
          <TabsContent value="new-listing">
            <PropertyListingForm />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground mb-4">
              You are submitting a property as a guest. To manage your properties and access additional features, please sign in or create an account.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
              <Button variant="outline" onClick={() => navigate("/auth/register")}>Create Account</Button>
            </div>
          </div>
          <PropertyListingForm />
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;