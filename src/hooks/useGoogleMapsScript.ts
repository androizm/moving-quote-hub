import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadScript = () => {
      console.log("Loading Google Maps script...");
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded successfully");
        setIsLoaded(true);
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

    loadScript();
  }, [toast]);

  return isLoaded;
};