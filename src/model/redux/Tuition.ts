import { BaseState } from "./BaseState";

// State Interfaces
export interface TuitionState extends BaseState {
    isLoadingMemberDetail: boolean;
    isLoadingInsertTuition: boolean;
}

// Init
export const TuitionStateInitial: TuitionState = {
    isLoading: false,
    isLoadingMemberDetail: false,
    isLoadingInsertTuition: false,
    isError: false,
}