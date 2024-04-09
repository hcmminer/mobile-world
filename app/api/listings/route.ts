import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { Listing } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

export async function POST(
  request: Request, 
) {
  connectToDB(); // Kết nối tới cơ sở dữ liệu
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const data = {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue: location.value,
    price: parseInt(price, 10),
    userId: currentUser.id
  };

  const listing = await Listing.create(data);

  return NextResponse.json(listing);
}
