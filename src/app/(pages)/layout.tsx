'use client';
import { clearUserState } from "@/lib/features/authSlice";
import { checkToken } from "@/utils/userSession";
import { StatusCodes } from "http-status-codes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

async function checkAuth(): Promise<any> {
    const cookies = await checkToken();
    return cookies;
}

export function redirectSessionExpired(errMsg: string): any {
    if (errMsg.indexOf(StatusCodes.UNAUTHORIZED.toString())) {
        window.location.href = '/login';
    }
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        checkAuth().then((res: boolean) => {
            if (!res) {
                dispatch(clearUserState());
            }
        });
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    )
}
