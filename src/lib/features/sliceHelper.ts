'use client'

import { StatusCodes } from "http-status-codes";

export function sessionExpired(res: any): void {
    if (res.meta.code == StatusCodes.UNAUTHORIZED)
        window.location.replace('/login');
}

export function checkResponse(response: any): any {
    // Check if Request is Success
    if (response.meta.code !== StatusCodes.OK) {
        sessionExpired(response);
        throw response;
    }
}
