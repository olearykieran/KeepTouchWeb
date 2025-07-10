/**
 * API utilities for the ReconnectWidget
 */

/**
 * Fetches a personalized plan based on name and blocker
 * @param name The user's name
 * @param block The selected blocker
 * @returns The personalized plan
 */
export async function getPlan(name: string, block: string): Promise<string> {
  try {
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, block }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plan: ${response.status}`);
    }

    const data = await response.json();
    return data.plan;
  } catch (error) {
    console.error('Error fetching plan:', error);
    return 'Unable to generate plan at this time. Please try again later.';
  }
}

/**
 * Sends lead information to the Supabase edge function
 * @param email User's email
 * @param person User's name
 * @param block Selected blocker
 * @param plan Generated plan
 * @returns Success status
 */
export async function sendLead(
  email: string,
  person: string | null,
  block: string | null,
  plan: string | null
): Promise<boolean> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, person, block, plan }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send lead: ${response.status}`);
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error sending lead:', error);
    return false;
  }
}
