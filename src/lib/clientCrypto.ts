import { decryptVaultData, deriveEncryptionKey, encryptVaultData, generateIV } from "./crypto";

class CryptoManager {
  private encryptionKey: string | null = null;

  /**
   * Initialize encryption key from master password
   * Called after login/signup
   */
  initializeKey(masterPassword: string, salt: string): void {
    this.encryptionKey = deriveEncryptionKey(masterPassword, salt);
  }

  /**
   * Get the encryption key (throws if not initialized)
   */
  getKey(): string {
    if (!this.encryptionKey) {
      throw new Error("Encryption key not initialized. Please log in again.");
    }
    return this.encryptionKey;
  }

  /**
   * Clear encryption key from memory (on logout)
   */
  clearKey(): void {
    this.encryptionKey = null;
  }

  /**
   * Check if key is initialized
   */
  isInitialized(): boolean {
    return this.encryptionKey !== null;
  }

  /**
   * Encrypt vault item for storage
   */
  encryptItem(data: {
    title: string;
    username: string;
    password: string;   
    url?: string;
    notes?: string;
  }): { encryptedData: string; iv: string } {
    const key = this.getKey();
    const iv = generateIV();
    const encryptedData = encryptVaultData(data, key, iv);

    return { encryptedData, iv };
  }

  /**
   * Decrypt vault item from storage
   */
  decryptItem(encryptedData: string, iv: string) {
    const key = this.getKey();
    return decryptVaultData(encryptedData, key, iv);
  }
}


export const cryptoManager = new CryptoManager();

