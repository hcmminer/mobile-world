import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { Listing } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  connectToDB(); // Kết nối tới cơ sở dữ liệu
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await Listing.deleteMany({ _id: listingId, userId: currentUser.id });

  return NextResponse.json(listing);
}
