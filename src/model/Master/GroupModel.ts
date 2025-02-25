import { BaseModel } from "./BaseModel";
import { User, UserInitial } from "./UserModel";

export interface Group extends BaseModel {
    group_name: string;
    group_description: string;
    group_address: string;
    user_in: number | null;
}

export interface MemberType extends BaseModel {
    member_type_name: string;
}

export interface GroupMember extends BaseModel {
    group: Group | null;
    user: User | null;
    member_type: MemberType | null;
    status: "Active" | "Not Active" | null;
    join_date: Date | null;
    leave_date: Date | null;
    leave_note: string | null;
}

export interface LeaveGroupMember {
    group_member_id: number;
    leave_note: string;
}

export const GroupInitial: Group = {
    id: null,
    group_name: "",
    group_description: "",
    group_address: "",
    user_in: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export const MemberTypeInitial: MemberType = {
    id: null,
    member_type_name: "",
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export const GroupMemberInitial: GroupMember = {
    id: null,
    group: GroupInitial,
    user: UserInitial,
    member_type: MemberTypeInitial,
    status: null,
    join_date: null,
    leave_date: null,
    leave_note: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}