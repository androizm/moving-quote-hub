import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Ruler } from "lucide-react";

interface MovingDetailsStepProps {
  formData: {
    fromAddress: string;
    toAddress: string;
    moveDateStart: string;
    moveDateEnd: string;
    livingSpaceSqm: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MovingDetailsStep = ({ formData, onChange }: MovingDetailsStepProps) => {
  return (
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
            onChange={onChange}
            required
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
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="moveDateStart">Earliest Move Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="moveDateStart"
            name="moveDateStart"
            type="date"
            className="pl-10"
            value={formData.moveDateStart}
            onChange={onChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="moveDateEnd">Latest Move Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="moveDateEnd"
            name="moveDateEnd"
            type="date"
            className="pl-10"
            value={formData.moveDateEnd}
            onChange={onChange}
            required
            min={formData.moveDateStart || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="livingSpaceSqm">Living Space (m²)</Label>
        <div className="relative">
          <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="livingSpaceSqm"
            name="livingSpaceSqm"
            type="number"
            className="pl-10"
            placeholder="Enter living space in square meters"
            value={formData.livingSpaceSqm}
            onChange={onChange}
            required
            min="1"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};