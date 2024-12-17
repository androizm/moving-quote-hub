import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomerAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        if (event === "SIGNED_IN") {
          console.log("Customer signed in:", session);
          setShowPhoneInput(true);
        }
        if (event === "SIGNED_OUT") {
          console.log("Customer signed out");
          setError(null);
          setShowPhoneInput(false);
        }
        if (event === "USER_UPDATED") {
          console.log("Customer profile updated");
          navigate("/customer-portal");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { phone, role: 'customer' }
      });

      if (updateError) throw updateError;
      navigate("/customer-portal");
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message);
      setShowPhoneInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Customer Login</h1>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Password must be at least 6 characters long.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showPhoneInput ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    title="Please enter a valid 10-digit phone number"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Complete Sign Up</Button>
            </form>
          ) : (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              redirectTo={window.location.origin + "/customer-portal"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;