"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbconnect";
import userModel from "@/models/user";

export async function getCurrentUser() {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userId = decoded.userId;

    const user = await userModel
      .findById(userId)
      .select({ email: 1 })
      .lean<{ _id: string; email: string }>();

    if (!user) {
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    };
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return { isAuthenticated: false };
  }
}
