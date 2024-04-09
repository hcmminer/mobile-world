import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

interface IParams {
  listingId?: string;
}

export async function POST(
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

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await User.findByIdAndUpdate(
    currentUser.id,
    { favoriteIds: favoriteIds },
    { new: true }
  );

  return NextResponse.json(user);
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

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await User.findByIdAndUpdate(
    currentUser.id,
    { favoriteIds: favoriteIds },
    { new: true }
  );


  return NextResponse.json(user);
}
