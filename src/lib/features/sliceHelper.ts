'use client'

import { sessionExpired } from "@/app/(pages)/layout";
import { StatusCodes } from "http-status-codes";

export function checkResponse(response: any): any {
    // Check if Request is Success
    if (response.meta.code !== StatusCodes.OK) {
        sessionExpired(response);
        throw response;
    }
}
