"use client";
import { clearUserState, fetch, setGroupMemberActive } from "@/lib/features/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { User } from "@/model/Master/UserModel";
import { checkToken } from "@/utils/userSession";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function checkAuth(): Promise<any> {
    const cookies = await checkToken();
    return cookies;
}

async function fetchUser(dispatch: AppDispatch): Promise<any> {
    try {
        const response: any = await dispatch(fetch());
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

// Layout wrapped all pages
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const userState: User = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {

        fetchUser(dispatch)
            .then((res) => {
                if (res.error) throw res;
                if (res.meta.code === StatusCodes.OK) {
                    console.log(res);
                }
            })
            .catch((err) => {
                toast.error(`Get User Data Failed. ${err.payload.result?.message}`);
            });

        checkAuth().then((res: boolean) => {
            if (!res) {
                dispatch(clearUserState());
                router.push("/login");
            } else {
                if (userState.email_verified_at == null) {
                    router.push("/unverified");
                }
            }
        });
    }, [dispatch]);

    return <>{children}</>;
}
