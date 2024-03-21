// Model
export interface Meta {
    code: number;
    status: string;
    message: string;
}

export interface BaseResponse {
    meta: Meta;
    result: any;
}

// Init
export const MetaInitial: Meta = {
    code: -1,
    status: "",
    message: "",
}

export const BaseResponseInitial: BaseResponse = {
    meta: MetaInitial,
    result: null
}