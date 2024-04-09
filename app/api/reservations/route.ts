import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Listing, Reservation } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

export async function POST(request: Request) {
    connectToDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }

    // Tạo một đặt phòng mới
    const newReservation = await Reservation.create({
      userId: currentUser.id,
      startDate,
      endDate,
      totalPrice,
    });

    // Liên kết đặt phòng mới với danh sách tương ứng
    await Listing.updateOne(
      { _id: listingId },
      { $push: { reservations: newReservation._id } }
    );

    // Lấy thông tin về danh sách sau khi được cập nhật
    const updatedListing = await Listing.findOne({ _id: listingId }).populate('reservations');

    // Trả về kết quả thành công với thông tin về cả danh sách và đặt phòng mới
    return NextResponse.json({ listing: updatedListing, reservation: newReservation });
  
}
