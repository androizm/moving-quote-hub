import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface UsePlacesAutocompleteProps {
  onPlaceSelect: (address: string) => void;
  isGoogleMapsLoaded: boolean;
}

export const usePlacesAutocomplete = ({ 
  onPlaceSelect, 
  isGoogleMapsLoaded 
}: UsePlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<typeof google.maps.places.Autocomplete | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isGoogleMapsLoaded || !inputRef.current) {
      console.log("Google Maps not loaded or input ref not available");
      return;
    }

    console.log("Initializing autocomplete...");
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address"],
    };

    const autoComplete = new window.google.maps.places.Autocomplete(
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

    autocompleteRef.current = autoComplete;

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isGoogleMapsLoaded, onPlaceSelect]);

  return { inputRef };
};