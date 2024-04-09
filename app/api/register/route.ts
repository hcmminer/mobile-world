import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

export async function POST(
  request: Request,
) {
  connectToDB(); // Kết nối tới cơ sở dữ liệu
  const body = await request.json();
  const {
    email,
    name,
    password,
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = {
    email,
    name,
    hashedPassword,
  };

  const user = await User.create(data);

  return NextResponse.json(user);
}
