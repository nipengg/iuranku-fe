import { BaseModel } from "./BaseModel";
import { User, UserInitial } from "./UserModel";

export interface NewsModel extends BaseModel {
    news_title: string;
    content: string;
    author_id: number;
}

export interface News extends BaseModel {
    news_title: string;
    content: string;
    author: User;
}

export const NewsInitial: News = {
    id: null,
    news_title: "",
    content: "",
    author: UserInitial,
    created_at: null,
    updated_at: null,
    deleted_at: null,
}
