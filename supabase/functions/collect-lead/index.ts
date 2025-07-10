import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface LeadData {
  email: string;
  person?: string;
  block?: string;
  plan?: string;
}

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse the request body
    const data = (await req.json()) as LeadData;

    // Validate required fields
    if (!data.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Verify hCaptcha
    // const captchaValid = true;
    // if (!captchaValid) {
    //   return new Response(JSON.stringify({ error: 'Invalid captcha' }), {
    //     status: 400,
    //     headers: { 'Content-Type': 'application/json' }
    //   })
    // }

    // Insert the lead into the database
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        email: data.email,
        person: data.person || null,
        block: data.block || null,
        plan: data.plan || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting lead:", error);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Send welcome email with the plan
    // For now, we'll just return success
    // This would be replaced with actual email sending logic using Supabase Edge Function email capabilities

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead collected successfully",
        leadId: lead.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
