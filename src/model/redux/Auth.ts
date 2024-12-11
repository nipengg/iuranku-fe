import { User, UserInitial } from "../Master/UserModel";
import { BaseState } from "./BaseState";

// State Interfaces
export interface AuthState extends BaseState {
    // Profile
    user: User;
    isTokenExpire: boolean;
}

// Init
export const AuthStateInitial: AuthState = {
    user: { ...UserInitial },
    isLoading: false,
    isError: false,
    isTokenExpire: false,
}