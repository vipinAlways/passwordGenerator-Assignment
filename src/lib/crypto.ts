import CryptoJS from "crypto-js";
import { Url } from "url";

export async function generateSalt(): Promise<string> {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

export function deriveEncryptionKey(
  masterPassword: string,
  salt: string
): string {
  return CryptoJS.PBKDF2(masterPassword, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  }).toString();
}

export function generateIV(): string {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

/**
 * Encrypt vault item data
 *
 * @param data - Plain object containing vault item data
 * @param encryptionKey - Derived encryption key
 * @param iv - Initialization vector
 * @returns Encrypted string
 */
export function encryptVaultData(
  data: {
    username: string;
    password: string;
    url?: strign;
    notes?: string;
  },
  encryptionKey: string,
  iv: string
): string {
  const jsonString = JSON.stringify(data);

  const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

/**
 * Decrypt vault item data
 *
 * @param encryptedData - Encrypted string from database
 * @param encryptionKey - Derived encryption key
 * @param iv - Initialization vector from database
 * @returns Decrypted vault item data
 */
export function decryptVaultData(
  encryptedData: string,
  encryptionKey: string,
  iv: string
): {
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
} {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

  if (!jsonString) {
    throw new Error("Decryption failed - invalid key or corrupted data");
  }

  return JSON.parse(jsonString);
}
