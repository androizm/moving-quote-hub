import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MovingDetailsStep } from "./form-steps/MovingDetailsStep";
import { CustomerInfoStep } from "./form-steps/CustomerInfoStep";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      console.log("Form submitted:", formData);
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
            <Button type="submit">Get Quotes</Button>
          )}
        </div>
      </form>
    </div>
  );
};