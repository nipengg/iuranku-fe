'use client';
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/lib/store";
import { User } from "@/model/Master/UserModel";

export function Providers({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}