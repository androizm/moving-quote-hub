import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MoveTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MoveTypeSelector = ({ value, onChange }: MoveTypeSelectorProps) => {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label>Type of Move</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: "private", label: "Private" },
          { value: "business", label: "Business" },
          { value: "international", label: "International" },
          { value: "piano", label: "Piano Transport" }
        ].map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};