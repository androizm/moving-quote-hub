import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Box } from "lucide-react";

interface MovingDetailsStepProps {
  formData: {
    fromAddress: string;
    toAddress: string;
    moveDate: string;
    roomCount: string;
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
        <Label htmlFor="moveDate">Moving Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="moveDate"
            name="moveDate"
            type="date"
            className="pl-10"
            value={formData.moveDate}
            onChange={onChange}
            required
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
            onChange={onChange}
            required
            min="1"
          />
        </div>
      </div>
    </div>
  );
};