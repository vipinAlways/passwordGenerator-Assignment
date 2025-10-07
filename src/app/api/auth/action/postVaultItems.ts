import { cryptoManager } from "@/lib/clientCrypto";
import dbConnect from "@/lib/dbconnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import vaultItemModel from "@/models/vaultItems";
import { error } from "console";

interface PostPasswordsProps {
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}

export const PostPasswords = async ({ data }: { data: PostPasswordsProps }) => {
  await dbConnect();

  try {
    const { encryptedData, iv } = cryptoManager.encryptItem(data);
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
