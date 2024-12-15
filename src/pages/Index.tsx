import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Truck, MapPin, Calendar, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
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
    // Reset form
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromAddress">Current Address</Label>
              <Input
                id="fromAddress"
                name="fromAddress"
                placeholder="Enter your current address"
                value={formData.fromAddress}
                onChange={handleInputChange}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toAddress">New Address</Label>
              <Input
                id="toAddress"
                name="toAddress"
                placeholder="Enter your new address"
                value={formData.toAddress}
                onChange={handleInputChange}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moveDate">Moving Date</Label>
              <Input
                id="moveDate"
                name="moveDate"
                type="date"
                value={formData.moveDate}
                onChange={handleInputChange}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>
            <Button onClick={() => setStep(2)} className="w-full">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomCount">Number of Rooms</Label>
              <Input
                id="roomCount"
                name="roomCount"
                type="number"
                placeholder="How many rooms?"
                value={formData.roomCount}
                onChange={handleInputChange}
                icon={<Box className="w-4 h-4" />}
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="w-full">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                icon={<Users className="w-4 h-4" />}
              />
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                Back
              </Button>
              <Button onClick={handleSubmit} className="w-full">
                Get Quotes
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
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
            Compare quotes from trusted moving companies and choose the best option for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Get Your Moving Quote</h2>
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full mx-2 ${
                      step === i ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              {renderStep()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary bg-opacity-10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                For Customers
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant quotes from trusted moving companies
              </p>
              <a
                href="/customer-login"
                className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
              >
                Customer Login
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary bg-opacity-10">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                For Moving Companies
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with customers looking for moving services
              </p>
              <a
                href="/company-login"
                className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
              >
                Company Login
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">Trusted by moving companies across the country</p>
          <div className="flex justify-center items-center space-x-8">
            <Building2 className="w-12 h-12 text-gray-400" />
            <Building2 className="w-12 h-12 text-gray-400" />
            <Building2 className="w-12 h-12 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;