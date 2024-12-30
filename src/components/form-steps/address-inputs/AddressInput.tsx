import { useGoogleMapsScript } from "@/hooks/useGoogleMapsScript";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";
import { AddressInputField } from "./AddressInputField";

interface AddressInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const AddressInput = ({ label, id, value, onChange, placeholder }: AddressInputProps) => {
  const isGoogleMapsLoaded = useGoogleMapsScript();

  const handlePlaceSelect = (address: string) => {
    const event = {
      target: {
        name: id,
        value: address,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const { inputRef } = usePlacesAutocomplete({
    onPlaceSelect: handlePlaceSelect,
  });

  if (!isGoogleMapsLoaded) {
    return (
      <AddressInputField
        label={label}
        id={id}
        value={value}
        onChange={onChange}
        placeholder="Loading address verification..."
        inputRef={inputRef}
      />
    );
  }

  return (
    <AddressInputField
      label={label}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      inputRef={inputRef}
    />
  );
};