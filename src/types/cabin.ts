// Type definitions for cabin-related data structures

// Main cabin interface representing a cabin in the database
export interface Cabin {
  id: number; // Unique identifier for the cabin
  name: string; // Display name of the cabin
  maxCapacity: number; // Maximum number of guests the cabin can accommodate
  regularPrice: number; // Standard price per night
  discount: number | null; // Optional discount amount (null if no discount)
  image: string; // URL or path to the cabin's image
  description: string; // Detailed description of the cabin
  createdAt?: string; // Optional timestamp when the cabin was created
  updatedAt?: string; // Optional timestamp when the cabin was last updated
}

// Interface for creating a new cabin (without id and timestamps)
export interface CreateCabinData {
  name: string; // Display name of the cabin
  maxCapacity: number; // Maximum number of guests
  regularPrice: number; // Standard price per night
  discount?: number; // Optional discount amount
  image: string; // URL or path to the cabin's image
  description: string; // Detailed description of the cabin
}

// Interface for updating an existing cabin
// Extends CreateCabinData but makes all fields optional (Partial)
// and requires the cabin id for identification
export interface UpdateCabinData extends Partial<CreateCabinData> {
  id: number; // Required cabin id for identification
}
