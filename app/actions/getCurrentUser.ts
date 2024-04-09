
import { User } from "@/models/entities";
import { connectToDB } from "@/utils/dbConfig";
import { useSession } from "next-auth/react";

export default async function getCurrentUser() {
  try {
    connectToDB();
    const {data:session} = useSession();
    
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

