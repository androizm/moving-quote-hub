import { useEffect, useRef, useState } from "react";

interface UsePlacesAutocompleteProps {
  onPlaceSelect: (address: string) => void;
}

export const usePlacesAutocomplete = ({ onPlaceSelect }: UsePlacesAutocompleteProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      console.log("Input ref not available");
      return;
    }

    console.log("Initializing autocomplete...");
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address"],
    };

    const autoComplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (place.formatted_address) {
        console.log("Selected address:", place.formatted_address);
        onPlaceSelect(place.formatted_address);
      }
    });

    setAutocomplete(autoComplete);

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onPlaceSelect]);

  return { inputRef };
};