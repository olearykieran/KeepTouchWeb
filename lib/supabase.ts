import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to save email signup from hero section
export async function saveEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('beta_signups')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving email:', error);
    return { success: false, error };
  }
}

// Function to save feedback from feedback form
export async function saveFeedback(feedback: string, email?: string) {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([{ 
        feedback, 
        email, 
        created_at: new Date().toISOString() 
      }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return { success: false, error };
  }
}