import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    console.log("session is:",session);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function getCurrentUser() {
  try {
    connectToDB();
    const session = await getSession();
  
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({ email: session.user.email as string });

    console.log("currentUser is: " ,currentUser);

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

