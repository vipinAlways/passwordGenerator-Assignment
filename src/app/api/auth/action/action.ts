"use server";

import dbConnect from "@/lib/dbconnect";
import userModel from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateSalt } from "@/lib/crypto";
import { cookies } from "next/headers";

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    throw new Error("Not able to find the data");
  }
  try {
    await dbConnect();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User Exist try another mail");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const encryptionSalt = await generateSalt();

    const user = await userModel.create({
      email,
      passwordHash,
      encryptionSalt,
    });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
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
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
