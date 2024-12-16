import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

interface ServiceAreaManagerProps {
  servicedZipCodes: string[];
  onUpdate: (newZipCodes: string[]) => void;
}

export const ServiceAreaManager = ({ servicedZipCodes, onUpdate }: ServiceAreaManagerProps) => {
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();
  const session = useSession();

  const handleAddZipCode = async () => {
    if (!zipCode.match(/^\d{5}$/)) {
      toast({
        variant: "destructive",
        title: "Invalid ZIP code",
        description: "Please enter a valid 5-digit ZIP code",
      });
      return;
    }

    if (servicedZipCodes.includes(zipCode)) {
      toast({
        variant: "destructive",
        title: "Duplicate ZIP code",
        description: "This ZIP code is already in your service area",
      });
      return;
    }

    const newZipCodes = [...servicedZipCodes, zipCode];
    const { error } = await supabase
      .from("profiles")
      .update({ service_zip_codes: newZipCodes })
      .eq("id", session?.user.id);

    if (error) {
      console.error("Error updating ZIP codes:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update service area",
      });
      return;
    }

    onUpdate(newZipCodes);
    setZipCode("");
    toast({
      title: "Success",
      description: "Service area updated successfully",
    });
  };

  const handleRemoveZipCode = async (zipToRemove: string) => {
    const newZipCodes = servicedZipCodes.filter(zip => zip !== zipToRemove);
    const { error } = await supabase
      .from("profiles")
      .update({ service_zip_codes: newZipCodes })
      .eq("id", session?.user.id);

    if (error) {
      console.error("Error removing ZIP code:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove ZIP code",
      });
      return;
    }

    onUpdate(newZipCodes);
    toast({
      title: "Success",
      description: "ZIP code removed successfully",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          maxLength={5}
          className="flex-1"
        />
        <Button onClick={handleAddZipCode}>Add</Button>
      </div>
      
      {servicedZipCodes.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {servicedZipCodes.map((zip) => (
            <div
              key={zip}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{zip}</span>
              <button
                onClick={() => handleRemoveZipCode(zip)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No service areas added yet.</p>
      )}
    </div>
  );
};