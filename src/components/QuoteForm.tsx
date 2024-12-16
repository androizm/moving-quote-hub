import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MovingDetailsStep } from "./form-steps/MovingDetailsStep";
import { CustomerInfoStep } from "./form-steps/CustomerInfoStep";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  roomCount: string;
  specialItems: string;
  name: string;
  email: string;
  phone: string;
}

export const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fromAddress: "",
    toAddress: "",
    moveDate: "",
    roomCount: "",
    specialItems: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFirstStep = () => {
    return (
      formData.fromAddress.trim() !== "" &&
      formData.toAddress.trim() !== "" &&
      formData.moveDate !== "" &&
      formData.roomCount !== ""
    );
  };

  const handleNext = () => {
    if (validateFirstStep()) {
      setStep(2);
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "All fields except special items are required.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If user is not logged in, redirect to login
    if (!session) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to submit a quote request.",
        variant: "destructive",
      });
      navigate("/customer-login");
      return;
    }

    if (formData.name && formData.email && formData.phone) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from("quote_requests").insert({
          from_address: formData.fromAddress,
          to_address: formData.toAddress,
          move_date: formData.moveDate,
          room_count: parseInt(formData.roomCount),
          special_items: formData.specialItems || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_id: session.user.id, // Add the user_id from the session
        });

        if (error) throw error;

        toast({
          title: "Quote Request Submitted",
          description: "We'll connect you with moving companies soon!",
        });

        setFormData({
          fromAddress: "",
          toAddress: "",
          moveDate: "",
          roomCount: "",
          specialItems: "",
          name: "",
          email: "",
          phone: "",
        });
        setStep(1);
      } catch (error) {
        console.error("Error submitting quote request:", error);
        toast({
          title: "Error submitting request",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone number are required.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card rounded-xl p-8 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Get Your Moving Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                step === i ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === 1 ? (
          <MovingDetailsStep formData={formData} onChange={handleInputChange} />
        ) : (
          <CustomerInfoStep formData={formData} onChange={handleInputChange} />
        )}

        <div className="flex justify-end gap-4">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          {step === 1 ? (
            <Button type="button" onClick={handleNext}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get Quotes"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};