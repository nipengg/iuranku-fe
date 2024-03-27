import { BaseModel } from "./BaseModel";

export interface Group extends BaseModel {
    group_name: string;
    group_description: string;
    user_in: number | null;
}

export interface MemberType extends BaseModel {
    member_type_name: string;
}

export interface GroupMember extends BaseModel {
    group: Group | null;
    member_type: MemberType | null;
    status: "Active" | "Not Active" | null;
    join_date: Date | null;
    leave_date: Date | null;
    leave_type: Date | null;
    leave_note: string | null;
}

export const GroupInitial: Group = {
    id: null,
    group_name: "",
    group_description: "",
    user_in: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}