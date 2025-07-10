'use server';

/**
 * Server action to send lead data to Supabase edge function
 */
export async function sendLead(
  email: string,
  person: string | null,
  block: string | null,
  plan: string | null
): Promise<{ success: boolean; message: string }> {
  try {
    // Get the Supabase URL from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl) {
      throw new Error('Missing Supabase URL configuration');
    }

    // Construct the URL for the edge function
    const functionUrl = `${supabaseUrl}/functions/v1/collect-lead`;
    
    // Send the data to the edge function
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The edge function will need to authenticate requests
        // We're using a server action so we can securely add the Authorization header
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ email, person, block, plan }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || `Server responded with ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'Lead submitted successfully!'
    };
  } catch (error) {
    console.error('Error in sendLead server action:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}
