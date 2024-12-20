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
  roomCount: string;
  specialItems: string;
  name: string;
  email: string;
  phone: string;
}

const initialFormData: QuoteFormData = {
  fromAddress: "",
  toAddress: "",
  moveDateStart: "",
  moveDateEnd: "",
  roomCount: "",
  specialItems: "",
  name: "",
  email: "",
  phone: "",
};

export const useQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeFormData = async () => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
          setFormData(prev => ({
            ...prev,
            name: fullName,
            email: session.user.email || '',
            phone: profile.phone || '',
          }));
        }
      }
    };

    initializeFormData();
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (session && (name === 'name' || name === 'email' || name === 'phone')) {
      return; // Prevent changes to auto-filled fields when logged in
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFirstStep = () => {
    return (
      formData.fromAddress.trim() !== "" &&
      formData.toAddress.trim() !== "" &&
      formData.moveDateStart !== "" &&
      formData.moveDateEnd !== "" &&
      formData.roomCount !== "" &&
      new Date(formData.moveDateEnd) >= new Date(formData.moveDateStart)
    );
  };

  const handleNext = () => {
    if (validateFirstStep()) {
      setStep(2);
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "All fields are required and the end date must be after or equal to the start date.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to submit a quote request.",
        variant: "destructive",
      });
      navigate("/customer-login");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: quoteRequest, error } = await supabase
        .from("quote_requests")
        .insert({
          from_address: formData.fromAddress,
          to_address: formData.toAddress,
          move_date_start: formData.moveDateStart,
          move_date_end: formData.moveDateEnd,
          room_count: parseInt(formData.roomCount),
          special_items: formData.specialItems || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_id: session.user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const { error: emailError } = await supabase.functions.invoke(
        "send-quote-notification",
        {
          body: { quoteRequest },
        }
      );

      if (emailError) {
        console.error("Error sending email notifications:", emailError);
      }

      toast({
        title: "Quote Request Submitted",
        description: "We'll connect you with moving companies soon!",
      });

      setFormData(initialFormData);
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