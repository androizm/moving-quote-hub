import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const CustomerAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("Customer signed in:", session);
          navigate("/customer-portal");
        }
        if (event === "SIGNED_OUT") {
          console.log("Customer signed out");
          setError(null);
        }
        if (event === "USER_UPDATED") {
          console.log("Customer profile updated");
        }
        // Handle registration error
        if (event === "INITIAL_SESSION" && !session) {
          console.log("Sign up failed");
          setError("This email is already registered. Please sign in instead.");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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

          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            redirectTo={window.location.origin + "/customer-portal"}
            onlyThirdPartyProviders={false}
            view="sign_in"
            additionalData={{
              role: 'customer'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;