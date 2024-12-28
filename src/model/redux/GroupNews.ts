import { BaseState } from "./BaseState";

// State Interfaces
export interface GroupNewsState extends BaseState {
}

// Init
export const GroupNewsStateInitial: GroupNewsState = {
    isLoading: false,
    isError: false,
}