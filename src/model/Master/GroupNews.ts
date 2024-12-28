import { BaseResponse } from "../Response/BaseResponse";
import { BaseModel } from "./BaseModel";
import { Group, GroupInitial } from "./GroupModel";
import { User, UserInitial } from "./UserModel";

export interface GroupNewsModel extends BaseModel {
    news_title: string;
    content: string;
    image: string;
    group_id: number;
    author_id: number;
}

export interface GroupNews extends BaseModel {
    news_title: string;
    content: string;
    image: string;
    group: Group;
    author: User;
}

export interface InsertGroupNewsForm {
    news_title: string;
    content: string;
    image: File | null;
    author_id: number;
    group_id: number;
}

export interface UpdateGroupNewsForm {
    group_news_id: number;
    news_title: string;
    content: string;
    image: File | null;
    author_id: number;
    group_id: number;
}


export const InsertGroupNewsFormInitial: InsertGroupNewsForm = {
    news_title: "",
    content: "",
    image: null,
    author_id: 0,
    group_id: 0,
}

export const GroupNewsInitial: GroupNews = {
    id: null,
    news_title: "",
    content: "",
    image: "",
    author: UserInitial,
    group: GroupInitial,
    created_at: null,
    updated_at: null,
    deleted_at: null,
}

export interface InsertGroupNewsResponse extends BaseResponse {
    result: {
        data: GroupNewsModel
    }
}
