import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { AddressInput } from "./address-inputs/AddressInput";
import { MoveDatePicker } from "./date-picker/MoveDatePicker";
import { LivingSpaceInput } from "./living-space/LivingSpaceInput";
import { MoveTypeSelector } from "./move-type/MoveTypeSelector";
import { useTranslation } from "react-i18next";

interface MovingDetailsStepProps {
  formData: {
    fromAddress: string;
    toAddress: string;
    moveDateStart: string;
    moveDateEnd: string;
    livingSpaceSqm: string;
    moveType: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MovingDetailsStep = ({ formData, onChange }: MovingDetailsStepProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<DateRange | undefined>({
    from: formData.moveDateStart ? new Date(formData.moveDateStart) : undefined,
    to: formData.moveDateEnd ? new Date(formData.moveDateEnd) : undefined,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from) {
      const event = {
        target: {
          name: 'moveDateStart',
          value: format(range.from, 'yyyy-MM-dd')
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    if (range?.to) {
      const event = {
        target: {
          name: 'moveDateEnd',
          value: format(range.to, 'yyyy-MM-dd')
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleMoveTypeChange = (value: string) => {
    const event = {
      target: {
        name: 'moveType',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <AddressInput
        label={t('currentAddress')}
        id="fromAddress"
        value={formData.fromAddress}
        onChange={onChange}
        placeholder={t('enterCurrentAddress')}
      />
      <AddressInput
        label={t('newAddress')}
        id="toAddress"
        value={formData.toAddress}
        onChange={onChange}
        placeholder={t('enterNewAddress')}
      />
      <MoveTypeSelector
        value={formData.moveType}
        onChange={handleMoveTypeChange}
      />
      <MoveDatePicker
        date={date}
        onSelect={handleDateSelect}
      />
      <LivingSpaceInput
        value={formData.livingSpaceSqm}
        onChange={onChange}
      />
    </div>
  );
};