import { BaseState } from "./BaseState";

// State Interfaces
export interface GroupTuitionSettingState extends BaseState {
}

// Init
export const GroupTuitionSettingStateInitial: GroupTuitionSettingState = {
    isLoading: false,
    isError: false,
}