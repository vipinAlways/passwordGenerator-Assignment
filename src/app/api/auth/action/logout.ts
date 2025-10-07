// actions/auth.ts
"use server";

import { cookies } from "next/headers";

export async function logout() {
  const cookie = await cookies();
  cookie.set({
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return { success: true };
}
