<lov-code>
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface QuoteFormData {
  fromAddress: string;
  toAddress: string;
  moveDateStart: string;
  moveDateEnd: string;
  livingSpaceSqm: string;
  specialItems: string;
  name: string;
  email: string;
  phone: string;
  moveType: string;
}

const initialFormData: QuoteFormData = {
  fromAddress: "",
  toAddress: "",
  moveDateStart: "",
  moveDateEnd: "",
  livingSpaceSqm: "",
  specialItems: "",
  name: "",
 