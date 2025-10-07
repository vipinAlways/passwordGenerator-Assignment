import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVaultItem extends Document {
  userId: mongoose.Types.ObjectId;
  encryptedData: string;
  iv: string;

  createdAt: Date;
  updatedAt: Date;
}

const VaultItemSchema: Schema<IVaultItem> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    encryptedData: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

VaultItemSchema.index({ userId: 1, createdAt: -1 });
const vaultItemModel: Model<IVaultItem> =
  mongoose.models.VaultItem ||
  mongoose.model<IVaultItem>("VaultItem ", VaultItemSchema);

export default vaultItemModel;
