import { Document } from "mongoose";

// Định nghĩa User Schema
export interface User extends Document {
  name: string;
  email: string;
  image?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  favoriteIds: string[];
  accounts: string[]; // Array of account IDs
  listings: string[]; // Array of listing IDs
  reservations: string[]; // Array of reservation IDs
}

// Định nghĩa Account Schema
export interface Account extends Document {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

// Định nghĩa Listing Schema
export interface Listing extends Document {
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string; // User ID who owns the listing
  price: number;
}

// Định nghĩa Reservation Schema
export interface Reservation extends Document {
  userId: string; // User ID who made the reservation
  listingId: string; // Listing ID which is reserved
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
}

// Định nghĩa loại dữ liệu an toàn cho Listing
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// Định nghĩa loại dữ liệu an toàn cho Reservation
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listingId"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

// Định nghĩa loại dữ liệu an toàn cho User
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
