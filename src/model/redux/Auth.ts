import { GroupMember, GroupMemberInitial } from "../Master/GroupModel";
import { User, UserInitial } from "../Master/UserModel";
import { BaseState } from "./BaseState";

// State Interfaces
export interface AuthState extends BaseState {
    // Profile
    user: User;
    groupMemberActive: GroupMember;
    isTokenExpire: boolean;
}

// Init
export const AuthStateInitial: AuthState = {
    user: { ...UserInitial },
    groupMemberActive: { ...GroupMemberInitial },
    isLoading: false,
    isError: false,
    isTokenExpire: false,
}