"use server";
import dbConnect from "@/lib/dbconnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import vaultItemModel from "@/models/vaultItems";

export const getValutitems = async () => {
  await dbConnect();
  try {
    const { user } = await getCurrentUser();

    if (!user) {
      throw new Error("User is Authorized");
    }

    const vaultems = await vaultItemModel
      .find({
        userId: user?.id,
      })
      .sort({
        createdAt: -1,
      });

    return vaultems.map((item) => ({
      _id: item._id,
      encryptedData: item.encryptedData,
      iv: item.iv,
      createdAt: item.createdAt.toISOString(),
    }));
  } catch (error) {
    throw error;    
  }
};
