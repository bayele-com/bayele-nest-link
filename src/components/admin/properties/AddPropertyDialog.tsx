import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PropertyListingForm from "@/components/property/PropertyListingForm";

const AddPropertyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto sm:w-[95%] p-4">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Create a new property listing. Fill in all the required information below.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <PropertyListingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyDialog;