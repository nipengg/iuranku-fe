'use client';
import { clearUserState } from "@/lib/features/authSlice";
import { checkToken } from "@/utils/userSession";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

async function checkAuth(): Promise<any> {
    const cookies = await checkToken();
    return cookies;
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
    }, []);

    return (
        <>
            {children}
        </>
    )
}
