import { BaseModel } from "./BaseModel";
import { GroupMember, GroupMemberInitial } from "./GroupModel";

export interface RequestTuition extends BaseModel {
    nominal: number;
    file: string;
    member: GroupMember;
    remark: string;
    status: string;
}

export const RequestTuitionInitial: RequestTuition = {
    id: null,
    nominal: 0,
    member: GroupMemberInitial,
    file: "",
    remark: "",
    status: "",
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export interface InsertRequestTuitionForm {
    nominal: number;
    remark: string;
    file: File | null;
    user_id: number;
    group_id: number;
}

export interface HandleRequestTuitionForm {
    request_tuition_id: number,
    status: string,
}

export const InsertRequestTuitionFormInitial: InsertRequestTuitionForm = {
    nominal: 0,
    remark: "",
    file: null,
    user_id: 0,
    group_id: 0,
}