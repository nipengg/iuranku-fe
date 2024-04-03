'use client';
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { useRef } from "react";

export function Providers({ children }: Readonly<{ children: React.ReactNode; }>) {

    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={storeRef.current.__persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}