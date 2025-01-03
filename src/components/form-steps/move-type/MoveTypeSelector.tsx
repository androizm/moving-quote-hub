import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, Home, Plane, Piano } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MoveTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MoveTypeSelector = ({ value, onChange }: MoveTypeSelectorProps) => {
  const { t } = useTranslation();

  const moveTypes = [
    { 
      value: "private", 
      label: t('private'),
      icon: Home,
      description: t('privateMove')
    },
    { 
      value: "business", 
      label: t('business'),
      icon: Building2,
      description: t('businessMove')
    },
    { 
      value: "international", 
      label: t('international'),
      icon: Plane,
      description: t('internationalMove')
    },
    { 
      value: "piano", 
      label: t('pianoTransport'),
      icon: Piano,
      description: t('pianoMove')
    }
  ];

  return (
    <div className="space-y-3 md:col-span-2">
      <Label className="text-base">{t('moveType')}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {moveTypes.map((type) => {
          const Icon = type.icon;
          return (
            <label
              key={type.value}
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                transition-all duration-200 hover:border-primary
                ${value === type.value ? 'border-primary bg-primary/5' : 'border-gray-200'}
              `}
            >
              <RadioGroupItem value={type.value} className="sr-only" />
              <Icon className={`w-8 h-8 mb-2 ${value === type.value ? 'text-primary' : 'text-gray-500'}`} />
              <span className="font-medium mb-1">{type.label}</span>
              <span className="text-sm text-gray-500 text-center">{type.description}</span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
};