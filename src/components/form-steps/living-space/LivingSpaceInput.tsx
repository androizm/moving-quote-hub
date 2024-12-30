import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";

interface LivingSpaceInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LivingSpaceInput = ({ value, onChange }: LivingSpaceInputProps) => {
  return (
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
          value={value}
          onChange={onChange}
          required
          min="1"
          step="0.1"
        />
      </div>
    </div>
  );
};