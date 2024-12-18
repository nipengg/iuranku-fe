import { BaseState } from "./BaseState";

// State Interfaces
export interface TuitionState extends BaseState {
    isLoadingMemberDetail: boolean;
}

// Init
export const TuitionStateInitial: TuitionState = {
    isLoading: false,
    isLoadingMemberDetail: false,
    isError: false,
}