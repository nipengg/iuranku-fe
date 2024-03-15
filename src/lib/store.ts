import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'

const rootReducer = combineReducers({
    auth: authSlice
});

export const store = configureStore({
    reducer: rootReducer
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;