import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { PhoneInputForm } from "@/components/auth/PhoneInputForm";

const CompanyAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        if (event === "SIGNED_IN") {
          console.log("Company signed in:", session);
          setShowPhoneInput(true);
        }
        if (event === "SIGNED_OUT") {
          console.log("Company signed out");
          setError(null);
          setShowPhoneInput(false);
        }
        if (event === "USER_UPDATED") {
          console.log("Company profile updated");
          navigate("/company-portal");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { phone, role: 'company' }
      });

      if (updateError) throw updateError;
      navigate("/company-portal");
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message);
      setShowPhoneInput(false);
    }
  };

  return (
    <AuthLayout title="Company Login" error={error}>
      {showPhoneInput ? (
        <PhoneInputForm
          phone={phone}
          onPhoneChange={setPhone}
          onSubmit={handlePhoneSubmit}
        />
      ) : (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={window.location.origin + "/company-portal"}
        />
      )}
    </AuthLayout>
  );
};

export default CompanyAuth;