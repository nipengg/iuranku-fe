// Constant
export const API_URL: string = process.env.NEXT_PUBLIC_APP_DATABASE_CONNECTION_STRING as string == 'prod' ? process.env.NEXT_PUBLIC_APP_LARAVEL_API_URL as string : process.env.NEXT_PUBLIC_APP_LARAVEL_API_URL_LOCAL as string;
export const API_FLASK_URL: string = process.env.NEXT_PUBLIC_APP_FLASK_API_URL as string;
export const ACCESS_TOKEN: string = process.env.NEXT_PUBLIC_APP_COOKIES_TOKEN as string;
export const TOKEN_GOOGLE: string = process.env.NEXT_PUBLIC_APP_COOKIES_TOKEN_GOOGLE as string;
export const PUBLIC_BASE_URL_LOCAL: string = process.env.NEXT_PUBLIC_BASE_URL_LOCAL as string;
export const BACKEND_STORAGE: string = process.env.NEXT_PUBLIC_APP_LARAVEL_STORAGE as string;
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
export const SECRET_KEY: string = "Iuranku";

// Enum
export enum STATUS_SIGNIN {
    Authenticated = "Authenticated",
    Register = "Register",
    UserRegister = "User Registered"
}

export const TUITION_TYPE = {
    Kebersihan: {
        tuitionId: 1,
        tuitionName: "Kebersihan",
    },
    Keamanan: {
        tuitionId: 2,
        tuitionName: "Keamanan",
    },
    Kematian: {
        tuitionId: 3,
        tuitionName: "Kematian",
    },
} as const;
export type TuitionTypeKey = keyof typeof TUITION_TYPE;

export const MONTHS_CONSTAN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
