import { SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";

// Encrypt function
export function encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Decrypt function
export function decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
