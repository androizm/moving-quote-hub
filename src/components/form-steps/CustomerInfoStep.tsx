import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";

interface CustomerInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    specialItems: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CustomerInfoStep = ({ formData, onChange }: CustomerInfoStepProps) => {
  return (
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
            onChange={onChange}
            required
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
          onChange={onChange}
          required
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
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialItems">Special Items</Label>
        <Textarea
          id="specialItems"
          name="specialItems"
          placeholder="List any special items (piano, artwork, etc.)"
          value={formData.specialItems}
          onChange={onChange}
        />
      </div>
    </div>
  );
};