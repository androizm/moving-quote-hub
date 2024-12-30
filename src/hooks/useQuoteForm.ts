import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface QuoteFormData {
  fromAddress: string;
  toAddress: string;
  moveDateStart: string;
  moveDateEnd: string;
  livingSpaceSqm: string;
  specialItems: string;
  name: string;
  email: string;
  phone: string;
  moveType: string;
}

const initialFormData: QuoteFormData = {
  fromAddress: "",
  toAddress: "",
  moveDateStart: "",
  moveDateEnd: "",
  livingSpaceSqm: "",
  specialItems: "",
  name: "",
  email: "",
  phone: "",
  moveType: "private"
};

export const useQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (
      !formData.fromAddress ||
      !formData.toAddress ||
      !formData.moveDateStart ||
      !formData.moveDateEnd ||
      !formData.livingSpaceSqm ||
      !formData.moveType
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to submit a quote request.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("quote_requests").insert([
        {
          user_id: session.user.id,
          from_address: formData.fromAddress,
          to_address: formData.toAddress,
          move_date_start: formData.moveDateStart,
          move_date_end: formData.moveDateEnd,
          living_space_sqm: parseFloat(formData.livingSpaceSqm),
          special_items: formData.specialItems,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you with quotes from our moving partners.",
      });
      
      navigate("/customer-portal");
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    formData,
    isSubmitting,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
};