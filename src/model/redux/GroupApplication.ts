// State Interfaces
export interface GroupApplicationState {
    isLoading: boolean;
    isError: boolean;
}

// Init
export const GroupApplicationStateInitial: GroupApplicationState = {
    isLoading: false,
    isError: false,
}