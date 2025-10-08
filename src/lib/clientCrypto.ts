import {
  decryptVaultData,
  deriveEncryptionKey,
  encryptVaultData,
  generateIV,
} from "./crypto";

class CryptoManager {
  private encryptionKey: string | null = null;

  initializeKey(masterPassword: string, salt: string): void {
    this.encryptionKey = deriveEncryptionKey(masterPassword, salt);
  }

  getKey(): string {
    console.log("dshshkjshd", this.encryptionKey,"dsssds");
    if (!this.encryptionKey) {
      throw new Error("Encryption key not initialized. Please log in again.");
    }
    return this.encryptionKey;
  }

  clearKey(): void {
    this.encryptionKey = null;
  }

  isInitialized(): boolean {
    console.log(this.encryptionKey);
    return this.encryptionKey !== null;
  }

  encryptItem(data: {
    username: string;
    password: string;
    url?: string;
    notes?: string;
  }): { encryptedData: string; iv: string } {
   
    const key = this.getKey();
    console.log({key});
    const iv = generateIV();
    const encryptedData = encryptVaultData(data, key, iv);

    return { encryptedData, iv };
  }

  decryptItem(encryptedData: string, iv: string) {
    const key = this.getKey();
    return decryptVaultData(encryptedData, key, iv);
  }
}

export const cryptoManager = new CryptoManager();
