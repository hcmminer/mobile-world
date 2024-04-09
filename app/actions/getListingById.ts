import { Listing } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    connectToDB();
    const { listingId } = params;

    const listing = await Listing.findOne({ _id: listingId }).populate('user');

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified:
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
