import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddressInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const AddressInput = ({ label, id, value, onChange, placeholder }: AddressInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      console.log("Loading Google Maps script...");
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded successfully");
        initAutocomplete();
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load address verification service",
        });
      };
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
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
          const event = {
            target: {
              name: id,
              value: place.formatted_address,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }
      });

      setAutocomplete(autoComplete);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [id, onChange, toast]);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          ref={inputRef}
          id={id}
          name={id}
          className="pl-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};