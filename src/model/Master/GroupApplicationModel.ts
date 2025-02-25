import { BaseModel } from "./BaseModel";
import { Group, GroupInitial } from "./GroupModel";
import { User, UserInitial } from "./UserModel";

export interface GroupApplication extends BaseModel {
    group: Group | null;
    user: User | null;
    status: "Pending" | "Accepted" | "Rejected" | "Canceled" | null;
}

export interface GroupApplicationInvite {
    group_id: number;
    user_id: number;
}

export interface GroupApplicationHandle {
    group_application_id: number;
    status: string;
}

export const GroupApplicationInitial: GroupApplication = {
    id: null,
    group: GroupInitial,
    user: UserInitial,
    status: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
}
