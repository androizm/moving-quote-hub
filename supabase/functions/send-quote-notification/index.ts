import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  id: string;
  from_address: string;
  to_address: string;
  move_date: string;
  room_count: number;
  special_items?: string;
  name: string;
  email: string;
  phone: string;
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quoteRequest } = await req.json();
    console.log("Received quote request:", quoteRequest);

    // Get all company profiles that service the areas
    const fromZip = quoteRequest.from_address.match(/\d{5}/)?.[0];
    const toZip = quoteRequest.to_address.match(/\d{5}/)?.[0];

    const { data: companies } = await supabase
      .from("profiles")
      .select("email, company_name")
      .eq("role", "company")
      .or(`service_zip_codes.cs.{${fromZip}},service_zip_codes.cs.{${toZip}}`);

    console.log("Found matching companies:", companies);

    if (!companies || companies.length === 0) {
      console.log("No matching companies found");
      return new Response(
        JSON.stringify({ message: "No matching companies found" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Send email to each matching company
    const emailPromises = companies.map(async (company) => {
      if (!company.email) return; // Skip if company has no email

      const emailHtml = `
        <h2>New Moving Quote Request</h2>
        <p>A new quote request has been submitted that matches your service area:</p>
        <ul>
          <li><strong>Customer:</strong> ${quoteRequest.name}</li>
          <li><strong>From:</strong> ${quoteRequest.from_address}</li>
          <li><strong>To:</strong> ${quoteRequest.to_address}</li>
          <li><strong>Move Date:</strong> ${new Date(
            quoteRequest.move_date
          ).toLocaleDateString()}</li>
          <li><strong>Number of Rooms:</strong> ${quoteRequest.room_count}</li>
          ${
            quoteRequest.special_items
              ? `<li><strong>Special Items:</strong> ${quoteRequest.special_items}</li>`
              : ""
          }
        </ul>
        <p>Please log in to your dashboard to submit a quote.</p>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "MoveShop24 <quotes@resend.dev>",
          to: [company.email],
          subject: "New Moving Quote Request",
          html: emailHtml,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(
          `Failed to send email to ${company.email}:`,
          error
        );
        return { success: false, company: company.email, error };
      }

      console.log(`Email sent successfully to ${company.email}`);
      return { success: true, company: company.email };
    });

    const results = await Promise.all(emailPromises);
    console.log("Email sending results:", results);

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);