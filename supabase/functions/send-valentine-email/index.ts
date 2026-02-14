import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { noCount, ip, location } = await req.json();

    const htmlContent = `
      <div style="font-family: 'Georgia', serif; max-width: 500px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #fff0f3, #ffe4e8); border-radius: 16px;">
        <h1 style="color: #e11d48; text-align: center; font-size: 28px;">💕 Grace Said YES! 💕</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; text-align: center;">
          She accepted your Valentine's proposal!
        </p>
        <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="margin: 8px 0; color: #333;"><strong>🚫 Times she tried to say No:</strong> ${noCount}</p>
          <p style="margin: 8px 0; color: #333;"><strong>🌍 IP Address:</strong> ${ip || 'Unknown'}</p>
          <p style="margin: 8px 0; color: #333;"><strong>📍 Location:</strong> ${location || 'Unknown'}</p>
        </div>
        <p style="text-align: center; color: #e11d48; font-size: 14px;">Happy Valentine's Day! 🌹</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Valentine <onboarding@resend.dev>',
        to: ['lawsonjosh213@gmail.com'],
        subject: '💕 Grace Said YES to Your Valentine Proposal!',
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
