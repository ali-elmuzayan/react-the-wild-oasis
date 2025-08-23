import { Cabin } from "../types/cabin";
import supabase, { supabaseUrl } from "./supabase";

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
 * Delete a cabin from database and its associated image from storage
 */
export async function deleteCabin(id: number) {
  // First, get the cabin data to extract the image URL
  const { data: cabinData, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching cabin:", fetchError);
    throw new Error("Cabin could not be found");
  }

  // Delete the cabin from database
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Cabin could not be deleted");
  }

  // If cabin has an image, try to delete it from storage
  if (cabinData.image) {
    try {
      // Extract image name from the URL
      // URL format: https://supabase-url/storage/v1/object/public/cabin-images/image-name
      const imageName = cabinData.image;
      if (imageName) {
        const { error: storageError } = await supabase.storage
          .from("cabin-images")
          .remove([imageName]);

        if (storageError) {
          console.error("Storage error (image deletion):", storageError);
          // Don't throw error here as the cabin was already deleted
          // Just log the error for debugging
        } else {
          console.log("Image deleted successfully:", imageName);
        }
      }
    } catch (storageError) {
      console.error("Error deleting image from storage:", storageError);
      // Don't throw error here as the cabin was already deleted
      // Just log the error for debugging
    }
  }

  return data;
}

/**
 * Create a new cabin
 */
export async function createCabin(
  newCabin: Omit<Cabin, "id" | "image"> & { image: File | null }
) {
  console.log("newCabin:", newCabin);
  console.log("image:", newCabin.image);

  // Check if image exists
  if (!newCabin.image) {
    throw new Error("Please select an image");
  }

  // Upload image first
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    ""
  );
  console.log(imageName);
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error("Storage error:", storageError);
    throw new Error("Image could not be uploaded");
  }

  // Insert cabin data with image URL
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error("Database error:", error);
    // If cabin creation fails, try to delete the uploaded image
    await supabase.storage.from("cabin-images").remove([imageName]);
    throw new Error("Cabin could not be created");
  }

  return data;
}
