// Supabase client configuration and initialization
import { createClient } from "@supabase/supabase-js";

// Get Supabase configuration from environment variables
// These should be defined in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that required environment variables are present
// This prevents runtime errors if the .env file is missing or incomplete
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create and configure the Supabase client
// This client will be used throughout the app for database operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export the configured client for use in other parts of the application
export default supabase;
