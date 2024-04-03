import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import groupSlice from './features/groupSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    group: groupSlice
});

export const store = configureStore({
    reducer: rootReducer
});

export const makeStore = () => {
    const isServer = typeof window === 'undefined'
    if (isServer) {
        return store
    } else {
        const persistedReducer = persistReducer(persistConfig, rootReducer)
        let store: any = configureStore({
            reducer: persistedReducer,
        })
        store.__persistor = persistStore(store)
        return store
    }
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;