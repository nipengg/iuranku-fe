// State Interfaces
export interface GroupNewsState {
    isLoading: boolean;
    isError: boolean;
}

// Init
export const GroupNewsStateInitial: GroupNewsState = {
    isLoading: false,
    isError: false,
}