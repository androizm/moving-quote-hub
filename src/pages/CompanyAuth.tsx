import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CompanyAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("Company signed in:", session);
          navigate("/company-portal");
        }
        if (event === "SIGNED_OUT") {
          console.log("Company signed out");
          setError(null);
          setShowPhoneInput(false);
        }
        if (event === "USER_UPDATED") {
          console.log("Company profile updated");
        }
        if (event === "INITIAL_SESSION" && !session) {
          console.log("Sign up failed");
          setError("This email is already registered. Please sign in instead.");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session }, error: signUpError } = await supabase.auth.signUp({
        email: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
        options: {
          data: {
            phone,
            role: 'company'
          }
        }
      });

      if (signUpError) throw signUpError;
      if (session) {
        navigate("/company-portal");
      }
    } catch (err: any) {
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
          <h1 className="text-2xl font-bold mb-6 text-center">Company Login</h1>
          
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
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Complete Sign Up</Button>
            </form>
          ) : (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              redirectTo={window.location.origin + "/company-portal"}
              onlyThirdPartyProviders={false}
              view="sign_in"
              onSignUp={() => setShowPhoneInput(true)}
              additionalData={{
                role: 'company'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;