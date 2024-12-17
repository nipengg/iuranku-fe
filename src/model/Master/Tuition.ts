import { BaseModel } from "./BaseModel";
import { GroupMember, GroupMemberInitial } from "./GroupModel";
import { TypeTuition, TypeTuitionInitial } from "./GroupTuitionSetting";
import { RequestTuition, RequestTuitionInitial } from "./RequestTuition";

export interface Tuition extends BaseModel {
    requestTuition: RequestTuition;
    member: GroupMember;
    typeTuition: TypeTuition;
    nominal: number;
    period: Date | null;
}

export interface InsertTuitionForm {
    request_tuition_id: number;
    member_id: number;
    type_tuition: string;
    nominal: number;
    period: string;
}

export const TuitionInitial: Tuition = {
    id: null,
    requestTuition: RequestTuitionInitial,
    member: GroupMemberInitial,
    typeTuition: TypeTuitionInitial,
    nominal: 0,
    period: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}
