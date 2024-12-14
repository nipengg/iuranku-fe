import { BaseState } from "./BaseState";

// State Interfaces
export interface RequestTuitionState extends BaseState {
}

// Init
export const RequestTuitionStateInitial: RequestTuitionState = {
    isLoading: false,
    isError: false,
}