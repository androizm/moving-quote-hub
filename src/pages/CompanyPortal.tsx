import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CompanyPortal = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [servicedZipCodes, setServicedZipCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/company-login");
      return;
    }

    const checkRole = async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role, service_zip_codes")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data",
        });
        return;
      }

      if (profile?.role !== "company") {
        navigate("/");
        return;
      }

      setServicedZipCodes(profile.service_zip_codes || []);
      setIsLoading(false);
    };

    checkRole();
  }, [session, navigate, toast]);

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

    setServicedZipCodes(newZipCodes);
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

    setServicedZipCodes(newZipCodes);
    toast({
      title: "Success",
      description: "ZIP code removed successfully",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quote Requests</h2>
            <p className="text-gray-600">No new quote requests.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Service Area</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortal;