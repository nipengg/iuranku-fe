import { BaseState } from "./BaseState";

// State Interfaces
export interface GroupApplicationState extends BaseState {
}

// Init
export const GroupApplicationStateInitial: GroupApplicationState = {
    isLoading: false,
    isError: false,
}