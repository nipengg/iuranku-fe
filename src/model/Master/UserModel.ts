import { BaseResponse, MetaInitial } from "../Response/BaseResponse";

// Model
export interface User {
    id: number | null;
    name: string;
    email: string;
    gender: string | null;
    address: string | null;
    phone: string | null;
    role: string;
    created_at: Date | null;
    update_at: Date | null;
    deleted_at: Date | null;
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

// Init
export const UserInitial: User = {
    id: null,
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
    gender: "",
    created_at: null,
    update_at: null,
    deleted_at: null
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