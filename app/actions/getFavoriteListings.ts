
import { Listing } from "@/models/entities";
import getCurrentUser from "./getCurrentUser";
import { connectToDB } from "@/utils/dbConfig";

export default async function getFavoriteListings() {
  try {
    connectToDB();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favoriteIds = currentUser.favoriteIds || [];

    const favorites = await Listing.find({ _id: { $in: favoriteIds } });

    const safeFavorites = favorites.map((favorite: any) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
