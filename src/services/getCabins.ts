// Service function to fetch all cabins from the database
import supabase from "./supabase";

/**
 * Fetches all cabins from the Supabase database
 * @returns Promise<Cabin[]> - Array of cabin objects
 * @throws Error if the database query fails
 */
export async function getCabins() {
  // Query all records from the 'cabins' table
  const { data, error } = await supabase.from("cabins").select("*");

  // Handle any database errors
  if (error) {
    console.error("Database error:", error);
    throw new Error("Cabins could not be loaded");
  }

  // Return the fetched cabin data
  return data;
}
