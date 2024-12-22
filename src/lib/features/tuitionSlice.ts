import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@/utils/request";
import { checkResponse } from "./sliceHelper";
import { StatusCodes } from "http-status-codes";
import { TuitionState, TuitionStateInitial } from "@/model/redux/Tuition";
import { InsertTuitionForm } from "@/model/Master/Tuition";

const initialState: TuitionState = { ...TuitionStateInitial };
const URL = `${API_URL}/group/tuition`;

export const getTuitionByMemberId = createAsyncThunk(
    "group/getTuitionByMemberId",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/member`, params);
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

export const getTuitionMemberDetail = createAsyncThunk(
    "group/getTuitionMemberDetail",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/member/detail`, params);
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

export const getTuitionMember = createAsyncThunk(
    "group/getTuitionMember",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/member/status`, params);
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

export const getTuitionMemberPayment = createAsyncThunk(
    "group/getTuitionMemberPayment",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/member/payment`, params);
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

export const insertTuition = createAsyncThunk(
    "group/insertTuition",
    async (data: InsertTuitionForm[], thunkAPI) => {
        try {
            const response = await post(`${URL}/store`, data);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const tuitionSlice = createSlice({
    name: 'tuition',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTuitionByMemberId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTuitionByMemberId.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getTuitionByMemberId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getTuitionMember.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTuitionMember.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getTuitionMember.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getTuitionMemberDetail.pending, (state, action) => {
            state.isLoadingMemberDetail = true;
        });
        builder.addCase(getTuitionMemberDetail.fulfilled, (state, action) => {
            state.isLoadingMemberDetail = false;
        });
        builder.addCase(getTuitionMemberDetail.rejected, (state, action) => {
            state.isLoadingMemberDetail = false;
            state.isError = true;
        });

        builder.addCase(getTuitionMemberPayment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTuitionMemberPayment.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getTuitionMemberPayment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(insertTuition.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(insertTuition.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(insertTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { } = tuitionSlice.actions;
export default tuitionSlice.reducer;
