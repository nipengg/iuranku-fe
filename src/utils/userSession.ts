'use server';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_GOOGLE } from "@/constant";
import { cookies } from 'next/headers'

export const getToken = (googleToken: boolean = false) => {
    return cookies().get(googleToken ? LOCAL_STORAGE_KEY_GOOGLE : LOCAL_STORAGE_KEY);
};

export const checkToken = (): boolean => {
    return cookies().has(LOCAL_STORAGE_KEY) || cookies().has(LOCAL_STORAGE_KEY_GOOGLE);
};

export const saveToken = (token: string) => {
    cookies().set(LOCAL_STORAGE_KEY, token)
}

export const saveTokenGoogle = (token: string) => {
    cookies().set(LOCAL_STORAGE_KEY_GOOGLE, token);
}