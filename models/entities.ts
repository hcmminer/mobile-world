const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  image: String,
  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  favoriteIds: [{ type: Schema.Types.ObjectId }],
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }], // Một user có thể có nhiều account
  listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }], // Một user có thể có nhiều listing
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }], // Một user có thể có nhiều reservation
});

// Define Account Schema
const accountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

// Define Listing Schema
const listingSchema = new Schema({
  title: String,
  description: String,
  imageSrc: String,
  createdAt: { type: Date, default: Date.now },
  category: String,
  roomCount: Number,
  bathroomCount: Number,
  guestCount: Number,
  locationValue: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  price: Number,
});

// Define Reservation Schema
const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);
export const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
export const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
