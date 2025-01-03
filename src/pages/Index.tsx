import { motion } from "framer-motion";
import { QuoteForm } from "@/components/QuoteForm";
import { LoginSection } from "@/components/LoginSection";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const checkUserRole = async () => {
      if (session?.user) {
        console.log("Checking user role for:", session.user.id);
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
          return;
        }

        console.log("User profile:", profile);

        // Redirect based on role
        if (profile?.role === "super_admin") {
          navigate("/super-admin");
        } else if (profile?.role === "company") {
          navigate("/company-portal");
        } else if (profile?.role === "customer") {
          navigate("/customer-portal");
        }
      }
    };

    checkUserRole();
  }, [session, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-16">
          <img 
            src="/lovable-uploads/c266e933-1dde-46e4-9426-20c051352b6a.png" 
            alt="MoveShop24 Logo" 
            className="h-12 md:h-16"
          />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {session && (
              <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('findPerfectMovingCompany')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('compareQuotes')}
          </p>
        </motion.div>

        <QuoteForm />
        <LoginSection />
        <HowItWorks />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
