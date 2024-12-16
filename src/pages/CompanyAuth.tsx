import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CompanyAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("Company signed in:", session);
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
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
          <h1 className="text-2xl font-bold mb-6 text-center">Company Login</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            redirectTo={window.location.origin}
            onlyThirdPartyProviders={false}
            view="sign_in"
            additionalData={{
              role: 'company'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;