"use server";
import dbConnect from "@/lib/dbconnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import vaultItemModel from "@/models/vaultItems";
import { error } from "console";

interface PostPasswordsProps {
  encryptedData: string;
  iv: string;
}

export const PostPasswords = async ({
  encryptedData,
  iv,
}: PostPasswordsProps) => {
  await dbConnect();

  try {
    const userDetails = await getCurrentUser();
    if (!userDetails) {
      throw new Error("user is not authenticated");
    }

    if (!encryptedData || !iv) {
      throw new Error("Server issue ");
    }
    await vaultItemModel.create({
      userId: userDetails?.user?.id,
      encryptedData,
      iv,
    });
  } catch (error) {
    throw error;
  }
};
