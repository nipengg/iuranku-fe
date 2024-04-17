'use client';
import { clearUserState } from "@/lib/features/authSlice";
import { AppDispatch } from "@/lib/store";
import { checkToken } from "@/utils/userSession";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function sessionExpired(res: any): void {
    if (res.meta.code == StatusCodes.UNAUTHORIZED)
        window.location.replace('/login');
}

async function checkAuth(): Promise<any> {
    const cookies = await checkToken();
    return cookies;
}

// Layout wrapped all pages
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        checkAuth().then((res: boolean) => {
            if (!res) {
                dispatch(clearUserState());
                router.push('/login');
            }
        });
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    )
}
