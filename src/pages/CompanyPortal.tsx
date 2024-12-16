import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { CompanyHeader } from "@/components/company/CompanyHeader";

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  from_address: string;
  to_address: string;
  move_date: string;
  room_count: number;
  special_items: string | null;
  status: string;
  created_at: string;
}

const CompanyPortal = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [servicedZipCodes, setServicedZipCodes] = useState<string[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
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

  useEffect(() => {
    const fetchQuoteRequests = async () => {
      if (!servicedZipCodes.length) return;

      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .in("status", ["pending", "new"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching quote requests:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load quote requests",
        });
        return;
      }

      // Filter quotes based on ZIP codes
      const filteredQuotes = data.filter(quote => {
        const fromZip = quote.from_address.match(/\b\d{5}\b/)?.[0];
        const toZip = quote.to_address.match(/\b\d{5}\b/)?.[0];
        return (
          fromZip && 
          toZip && 
          (servicedZipCodes.includes(fromZip) || servicedZipCodes.includes(toZip))
        );
      });

      setQuoteRequests(filteredQuotes);
    };

    fetchQuoteRequests();
  }, [servicedZipCodes, toast]);

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
        <CompanyHeader />
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quote Requests</h2>
            {quoteRequests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Move Date</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quoteRequests.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>{format(new Date(quote.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div>{quote.name}</div>
                        <div className="text-sm text-gray-500">{quote.email}</div>
                        <div className="text-sm text-gray-500">{quote.phone}</div>
                      </TableCell>
                      <TableCell>{quote.from_address}</TableCell>
                      <TableCell>{quote.to_address}</TableCell>
                      <TableCell>{format(new Date(quote.move_date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{quote.room_count}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {quote.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-600">No quote requests matching your service areas.</p>
            )}
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
