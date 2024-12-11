import { BaseModel } from "./BaseModel";
import { Group, GroupInitial } from "./GroupModel";

export interface TypeTuition extends BaseModel {
    tuition_name: string,
}

export const TypeTuitionInitial: TypeTuition = {
    id: null,
    tuition_name: "",
    created_at: null,
    updated_at: null,
    deleted_at: null
}

export interface GroupTuitionSetting extends BaseModel {
    tuition_period: number;
    tuition_value: number;
    group: Group;
    typeTuition: TypeTuition;
}

export const  GroupTuitionSettingInitial: GroupTuitionSetting = {
    id: null,
    group: GroupInitial,
    typeTuition: TypeTuitionInitial,
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

