import { User, UserInitial } from "../Master/UserModel";

// State Interfaces
export interface AuthState {
    // Profile
    user: User;
    // State
    isLoading: boolean;
    isError: boolean;
}

// Init
export const AuthStateInitial: AuthState = {
    user: { ...UserInitial },
    isLoading: false,
    isError: false,
}