import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PhoneInputFormProps {
  phone: string;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PhoneInputForm = ({ phone, onPhoneChange, onSubmit }: PhoneInputFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="pl-10"
            placeholder="Enter your phone number"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            title="Please enter a valid 10-digit phone number"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Complete Sign Up</Button>
    </form>
  );
};