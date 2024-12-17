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
