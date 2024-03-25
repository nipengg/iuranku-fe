'use server';
import { ACCESS_TOKEN, TOKEN_GOOGLE } from "@/constant";
import { TokenResponse } from "@react-oauth/google";
import { cookies } from 'next/headers'

export const getToken = (googleToken: boolean = false) => {
    return cookies().get(googleToken ? TOKEN_GOOGLE : ACCESS_TOKEN);
};

export const checkToken = (): boolean => {
    return cookies().has(ACCESS_TOKEN);
};

export const saveToken = (token: string) => {
    cookies().set(ACCESS_TOKEN, token)
}

export const saveTokenGoogle = (token: TokenResponse) => {
    cookies().set(TOKEN_GOOGLE, JSON.stringify(token));
}