import { BaseModel } from "./BaseModel";
import { Group, GroupInitial } from "./GroupModel";
import { Tuition } from "./Tuition";

export interface TypeTuition extends BaseModel {
    tuition_name: string,
    tuition_for_period_count: number
}

export const TypeTuitionInitial: TypeTuition = {
    id: null,
    tuition_name: "",
    tuition_for_period_count: 0,
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export interface GroupTuitionSetting extends BaseModel {
    tuition_period: number;
    tuition_value: number;
    group: Group;
    type_tuition: TypeTuition;
}

export const  GroupTuitionSettingInitial: GroupTuitionSetting = {
    id: null,
    group: GroupInitial,
    type_tuition: TypeTuitionInitial,
    tuition_period: new Date().getFullYear(),
    tuition_value: 0,
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export interface InsertUpdateGroupTuitionSetting {
    group_tuition_setting_id: number | null;
    group_id: number | null;
    type_tuition: string | null;
    tuition_value: number;
    tuition_period: number;
}

