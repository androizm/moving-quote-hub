import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface CustomerProfile {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

export const useCustomerProfile = () => {
  const session = useSession();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching profile for user:", session.user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        console.log("Profile data received:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error in profile fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  return { profile, isLoading };
};