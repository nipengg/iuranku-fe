import { GroupMember, GroupMemberInitial } from "../Master/GroupModel";
import { BaseState } from "./BaseState";

// State Interfaces
export interface GroupState extends BaseState {
    groupActive: GroupMember;
}

// Init
export const GroupStateInitial: GroupState = {
    groupActive: { ...GroupMemberInitial },
    isLoading: false,
    isError: false,
}