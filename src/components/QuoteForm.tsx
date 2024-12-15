import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin, Calendar, Box, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromAddress">Current Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="fromAddress"
                  name="fromAddress"
                  className="pl-10"
                  placeholder="Enter your current address"
                  value={formData.fromAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toAddress">New Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="toAddress"
                  name="toAddress"
                  className="pl-10"
                  placeholder="Enter your new address"
                  value={formData.toAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="moveDate">Moving Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="moveDate"
                  name="moveDate"
                  type="date"
                  className="pl-10"
                  value={formData.moveDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomCount">Number of Rooms</Label>
              <div className="relative">
                <Box className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="roomCount"
                  name="roomCount"
                  type="number"
                  className="pl-10"
                  placeholder="How many rooms?"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  className="pl-10"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialItems">Special Items</Label>
              <Textarea
                id="specialItems"
                name="specialItems"
                placeholder="List any special items (piano, artwork, etc.)"
                value={formData.specialItems}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          {step === 1 ? (
            <Button type="button" onClick={() => setStep(2)}>
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