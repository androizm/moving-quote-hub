import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomerPortal = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate("/customer-login");
      return;
    }

    const checkRole = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "customer") {
        navigate("/");
      }
    };

    checkRole();
  }, [session, navigate]);

  const { data: quoteRequests, isLoading } = useQuery({
    queryKey: ["customerQuotes", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Moving Quotes</h2>
            {isLoading ? (
              <p className="text-gray-600">Loading your quotes...</p>
            ) : quoteRequests?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No quotes requested yet.</p>
                <Button onClick={() => navigate("/")}>Request Quote</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Move Dates</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quoteRequests?.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell>{quote.from_address}</TableCell>
                        <TableCell>{quote.to_address}</TableCell>
                        <TableCell>
                          {new Date(quote.move_date_start).toLocaleDateString()} - {new Date(quote.move_date_end).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="capitalize">{quote.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Get a Quote</h2>
            <p className="text-gray-600 mb-4">
              Ready to move? Get quotes from trusted moving companies.
            </p>
            <Button onClick={() => navigate("/")}>Request Quote</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;