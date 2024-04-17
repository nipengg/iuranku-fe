'use server';
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, PUBLIC_BASE_URL_LOCAL } from '@/constant';
import { redirect } from 'next/navigation'
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
    method?: string;
    data?: any;
    params?: any;
}

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        const accessToken = cookies().get(ACCESS_TOKEN);
        const AUTH_TOKEN = "Bearer " + accessToken?.value;
        config.headers.Authorization = AUTH_TOKEN;
        config.headers.Accept = 'application/json';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response: any) {
        if (response.status == StatusCodes.UNAUTHORIZED) {
            cookies().delete(ACCESS_TOKEN);
        }
        return response;
    },
    function (error) {
        if (error.response.status == StatusCodes.UNAUTHORIZED) {
            cookies().delete(ACCESS_TOKEN);
        }
        return Promise.reject(error);
    },
);

// Base Request
async function request(url: string, { method, data, params }: RequestParams = {}, options: AxiosRequestConfig = {}) {
    try {
        const res = await axios({ url, method, data, params, ...options });
        return res.data;
    } catch (error: any) {
        if (error.response.data) return error.response.data;
        else throw error;
    }
}

// Inherit request
export async function get(url: string, params?: any, options?: AxiosRequestConfig) {
    return await request(url, { method: "get", params }, options);
}

export async function post(url: string, data?: any, options?: AxiosRequestConfig) {
    return await request(url, { method: "post", data }, options);
}

export async function put(url: string, data?: any, options?: AxiosRequestConfig) {
    return await request(url, { method: "put", data }, options);
}

export async function patch(url: string, data?: any, options?: AxiosRequestConfig) {
    return await request(url, { method: "patch", data }, options);
}

export async function deleteRequest(url: string, data?: any, options?: AxiosRequestConfig) {
    return request(url, { method: "delete", data }, options);
}
