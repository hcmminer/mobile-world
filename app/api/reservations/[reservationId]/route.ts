import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { Reservation } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

interface IParams {
  reservationId?: string;
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

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('Invalid ID');
    }

    const reservation = await Reservation.deleteMany({
      _id: reservationId,
      $or: [
        { userId: currentUser.id },
        { 'listing.userId': currentUser.id }
      ]
    });

    return NextResponse.json(reservation);

}
