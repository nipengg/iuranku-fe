import { BaseResponse, MetaInitial } from "../Response/BaseResponse";
import { BaseModel } from "./BaseModel";
import { Group } from "./GroupModel";

// Model
export interface User extends BaseModel {
    id: number;
    name: string;
    email: string;
    gender: string | null;
    address: string | null;
    phone: string | null;
    role: string;
}

export interface UserRegister {
    name: string;
    email: string;
    gender: string | null;
    address: string | null;
    phone: string | null;
    password: string | null;
}

export interface UserResponseLogin extends BaseResponse {
    result: {
        access_token: string;
        token_type: string;
        user: User;
    }
}

export interface UserLoginForm {
    email: string;
    password: string;
    remember: boolean;
}

// Init
export const UserInitial: User = {
    id: 0,
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
    gender: "",
    created_at: null,
    updated_at: null,
    deleted_at: null,
}

export const UserRegisterInitial: UserRegister = {
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    password: "",
}

export const UserResponseLoginInitial: UserResponseLogin = {
    meta: MetaInitial,
    result: {
        access_token: "",
        token_type: "",
        user: UserInitial
    }
}

export const UserLoginFormInitial: UserLoginForm = {
    email: "",
    password: "",
    remember: false
}

// User Helper Mapping
export const MappingUserToFormData = (data: UserRegister): FormData => {
    var formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password as string);
    formData.append('address', data.address as string);
    formData.append('gender', data.gender as string);
    formData.append('phone', data.phone as string);

    return formData;
}

export const MappingUserGoogleToRequestObject = async (name: string, email: string): Promise<object> => {
    const reqObj = {
        name: name,
        email: email,
    }

    return reqObj;
}

