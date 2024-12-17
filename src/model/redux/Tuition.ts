import { BaseState } from "./BaseState";

// State Interfaces
export interface TuitionState extends BaseState {
}

// Init
export const TuitionStateInitial: TuitionState = {
    isLoading: false,
    isError: false,
}