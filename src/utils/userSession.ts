'use server';
import { ACCESS_TOKEN, TOKEN_GOOGLE } from "@/constant";
import { TokenResponse } from "@react-oauth/google";
import { cookies } from 'next/headers'

export const getToken = async (googleToken: boolean = false) => {
    return cookies().get(googleToken ? TOKEN_GOOGLE : ACCESS_TOKEN);
};

export const checkToken = async () => {
    return cookies().has(ACCESS_TOKEN);
};

export const saveToken = async (token: string) => {
    cookies().set(ACCESS_TOKEN, token);
}

export const saveTokenGoogle = (token: TokenResponse): void => {
    cookies().set(TOKEN_GOOGLE, JSON.stringify(token));
}

export const removeToken = async () => {
    cookies().delete(ACCESS_TOKEN);
}

export const removeTokenGoogle = async () => {
    cookies().delete(TOKEN_GOOGLE);
}