import { BaseState } from "./BaseState";

// State Interfaces
export interface GroupMemberState extends BaseState {
}

// Init
export const GroupMemberStateInitial: GroupMemberState = {
    isLoading: false,
    isError: false,
}