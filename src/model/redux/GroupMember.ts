// State Interfaces
export interface GroupMemberState {
    isLoading: boolean;
    isError: boolean;
}

// Init
export const GroupMemberStateInitial: GroupMemberState = {
    isLoading: false,
    isError: false,
}