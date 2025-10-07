// actions/auth.ts
"use server";

import dbConnect from "@/lib/dbconnect";
import userModel from "@/models/user";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await dbConnect();

  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: existingUser._id.toString() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  const cookie = await cookies();

  cookie.set({
    name: "token",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return { success: true };
}
