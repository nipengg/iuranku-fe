import { LOCAL_STORAGE_KEY } from "@/constant";
import { RootState } from "@/lib/store";
import { User } from "@/model/Master/UserModel";
import { useSelector } from "react-redux";

export const getToken = () => {
    const tokenString = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (tokenString == null) {
        return false;
    }
    const { token } = JSON.parse(tokenString);
    return token;
};

export const saveToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        token,
    }));
}