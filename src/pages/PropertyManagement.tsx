import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyListingForm from "@/components/property/PropertyListingForm";
import PropertyManagementDashboard from "@/components/property/PropertyManagementDashboard";

const PropertyManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Management</h1>
      
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
    </div>
  );
};

export default PropertyManagement;