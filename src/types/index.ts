export interface VaultItemData {
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}

export interface EncryptedVaultItem {
  _id: string;
  userId: string;
  encryptedData: string;
  iv: string;
  createdAt: string;
  updatedAt: string;
}

export interface DecryptedVaultItem extends VaultItemData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}