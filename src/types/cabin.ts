export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number | null;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCabinData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  image: string;
  description: string;
}

export interface UpdateCabinData extends Partial<CreateCabinData> {
  id: number;
}
