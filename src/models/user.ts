import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string; // bcrypt hash of master password
  encryptionSalt: string; // Used to derive encryption key from master password
  createdAt: Date;
  updatedAt: Date;
  vaultItem: string[];
}
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    encryptionSalt: {
      type: String,
      required: true,
    },
    vaultItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "VaultItem" }],
  },
  {
    timestamps: true,
  }
);

const userModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default userModel;
