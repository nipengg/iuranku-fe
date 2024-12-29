import { BaseState } from "./BaseState";

// State Interfaces
export interface NewsState extends BaseState {
}

// Init
export const NewsStateInitial: NewsState = {
    isLoading: false,
    isError: false,
}