import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@/utils/request";
import { checkResponse } from "./sliceHelper";
import { RequestTuitionState, RequestTuitionStateInitial } from "@/model/redux/RequestTuition";
import { HandleRequestTuitionForm, InsertRequestTuitionForm } from "@/model/Master/RequestTuition";
import { StatusCodes } from "http-status-codes";

const initialState: RequestTuitionState = { ...RequestTuitionStateInitial };
const URL = `${API_URL}/group/request-tuition`;

export const getTuitionRequest = createAsyncThunk(
    "group/getTuitionRequest",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}`, params);
            checkResponse(response);
            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const getTuitionRequestById = createAsyncThunk(
    "group/getTuitionRequestById",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/id`, params);
            checkResponse(response);
            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const insertRequestTuition = createAsyncThunk(
    "group/insertRequestTuition",
    async (data: InsertRequestTuitionForm, thunkAPI) => {
        try {

            const formData = new FormData();

            formData.append("user_id", data.user_id.toString());
            formData.append("group_id", data.group_id.toString());
            formData.append("file", data.file as Blob);
            formData.append("nominal", data.nominal.toString());
            formData.append("remark", data.remark);

            const response = await post(`${URL}/store`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            checkResponse(response);
            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const handleRequestTuition = createAsyncThunk(
    "group/handleRequestTuition",
    async (data: HandleRequestTuitionForm, thunkAPI) => {
        try {
            const response = await post(`${URL}/handle`, data);
            checkResponse(response);
            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const tuitionRequestSlice = createSlice({
    name: 'tuitionRequest',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTuitionRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTuitionRequest.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getTuitionRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getTuitionRequestById.pending, (state, action) => {

        });
        builder.addCase(getTuitionRequestById.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getTuitionRequestById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(insertRequestTuition.pending, (state, action) => {

        });
        builder.addCase(insertRequestTuition.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(insertRequestTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(handleRequestTuition.pending, (state, action) => {

        });
        builder.addCase(handleRequestTuition.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(handleRequestTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

    }
});

export const { } = tuitionRequestSlice.actions;
export default tuitionRequestSlice.reducer;
