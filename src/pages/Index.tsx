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

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

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
          {session && (
            <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Your Perfect Moving Company
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare quotes from trusted moving companies and save up to 40%
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