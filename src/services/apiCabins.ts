import supabase from "./supabase";

/**
 * Fetches all cabins from the Supabase database
 * @returns Promise<Cabin[]> - Array of cabin objects
 */
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  // Handle any database errors
  if (error) {
    console.error("Database error:", error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

/**
 * Delete a cabin from database
 */
export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
