import { BaseModel } from "./BaseModel";
import { GroupMember, GroupMemberInitial } from "./GroupModel";
import { TypeTuition, TypeTuitionInitial } from "./GroupTuitionSetting";
import { RequestTuition, RequestTuitionInitial } from "./RequestTuition";

export interface Tuition extends BaseModel {
    request_tuition: RequestTuition;
    member: GroupMember;
    type_tuition: TypeTuition;
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

export interface TuitionMember {
    member: GroupMember;
    monthlyStatus: Record<number, boolean>; 
}

export interface MonthlyStatus {
    month: number;
    status: boolean;
    tuitionAmount: number;
    paidAmount: number;
    tuition: Tuition[];
}

export interface TuitionMemberPayment {
    member: GroupMember;
    monthlyStatus: MonthlyStatus[]; 
}

export interface TuitionMemberDetail {
    year: number;
    monthlyStatus: Record<number, boolean>; 
}

export const TuitionInitial: Tuition = {
    id: null,
    request_tuition: RequestTuitionInitial,
    member: GroupMemberInitial,
    type_tuition: TypeTuitionInitial,
    nominal: 0,
    period: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}
