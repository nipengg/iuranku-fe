import { GroupMember, GroupMemberInitial } from "../Master/GroupModel";

// State Interfaces
export interface GroupState {
    groupActive: GroupMember;
    // State
    isLoading: boolean;
    isError: boolean;
}

// Init
export const GroupStateInitial: GroupState = {
    groupActive: { ...GroupMemberInitial },
    isLoading: false,
    isError: false,
}