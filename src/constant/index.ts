// Constant
export const API_URL: string = process.env.DATABASE_CONNECTION_STRING as string == 'prod' ? process.env.NEXT_PUBLIC_APP_LARAVEL_API_URL as string : process.env.NEXT_PUBLIC_APP_LARAVEL_API_URL_LOCAL as string;
export const ACCESS_TOKEN: string = process.env.NEXT_PUBLIC_APP_COOKIES_TOKEN as string;
export const TOKEN_GOOGLE: string = process.env.NEXT_PUBLIC_APP_COOKIES_TOKEN_GOOGLE as string;
export const PUBLIC_BASE_URL_LOCAL: string = process.env.NEXT_PUBLIC_BASE_URL_LOCAL as string;
export const GOOGLE_USER_INFO_API: string = 'https://www.googleapis.com/oauth2/v3/userinfo';
export const GOOGLE_CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET as string;
export const MAX_MOBILE_SCREEN_SIZE: string = "(max-width: 479px)";
export const DEBOUNCE_TIME: number = 500;
export const MANUAL_PAGINATION: boolean = true;
export const PAGE_SIZE: number = 10;
export const PAGE_VIEW: number[] = [10, 20, 30, 40, 50];
export const TABLE_DEFAULT_SORT: string = "desc";
export const ERROR_TYPE: string = "focus";
export const PLEASE_FILL: string = "Please Fill In";
export const MAX_ADD_OTHER: number = 3;
export const PHONE_REGEX: RegExp = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g;

// Enum
export enum STATUS_SIGNIN {
    Authenticated = "Authenticated",
    Register = "Register",
}