import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CompanyHeader } from "@/components/company/CompanyHeader";
import { QuoteRequestsTable } from "@/components/company/QuoteRequestsTable";
import { ServiceAreaManager } from "@/components/company/ServiceAreaManager";
import { Tables } from "@/integrations/supabase/types";

const CompanyPortal = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [servicedZipCodes, setServicedZipCodes] = useState<string[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<Tables<"quote_requests">[]>([]);
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
            <QuoteRequestsTable quoteRequests={quoteRequests} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Service Area</h2>
            <ServiceAreaManager 
              servicedZipCodes={servicedZipCodes}
              onUpdate={setServicedZipCodes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortal;