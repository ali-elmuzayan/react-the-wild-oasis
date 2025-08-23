import { Cabin } from "../types/cabin";
import supabase from "./supabase";

/**
 * Creates a promise that rejects after a specified timeout
 */
function timeoutPromise<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
    ),
  ]);
}

/**
 * Fetches all cabins from the Supabase database with a 10-second timeout
 * @returns Promise<Cabin[]> - Array of cabin objects
 */
export async function getCabinsWithTimeout() {
  return timeoutPromise(getCabins(), 10000); // 10 seconds timeout
}

/**
 * Test function to simulate a slow response (for testing timeout functionality)
 * Uncomment this function and replace getCabinsWithTimeout() with getCabinsWithTimeoutTest()
 * in CabinTable.tsx to test the timeout behavior
 */
export async function getCabinsWithTimeoutTest() {
  // Simulate a slow response that takes 15 seconds
  const slowPromise = new Promise<Cabin[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Test Cabin",
          maxCapacity: 4,
          regularPrice: 250,
          discount: 0,
          description: "Test cabin for timeout demonstration",
          image: "test-image.jpg",
        },
      ]);
    }, 15000); // 15 seconds delay
  });

  return timeoutPromise(slowPromise, 10000); // 10 seconds timeout
}

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

/**
 * Create a new cabin
 */
export async function createCabin(newCabin: Cabin) {
  const { data, error } = await supabase.from("cabins").insert(newCabin);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Cabin could not be created");
  }

  return data;
}
