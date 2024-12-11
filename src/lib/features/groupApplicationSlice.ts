import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroupApplicationState, GroupApplicationStateInitial } from "@/model/redux/GroupApplication";
import { checkResponse } from "./sliceHelper";
import { get, post } from "@/utils/request";
import { GroupApplicationHandle, GroupApplicationInvite } from "@/model/Master/GroupApplicationModel";

const initialState: GroupApplicationState = { ...GroupApplicationStateInitial };
const URL = `${API_URL}/group/application`;

export const getGroupApplication = createAsyncThunk(
    "group/getGroupApplication",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}`, params);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const inviteGroupApplication = createAsyncThunk(
    "group/inviteGroupApplication",
    async (data: GroupApplicationInvite, thunkAPI) => {
        try {
            const response = await post(`${URL}/invite`, data);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const handleGroupApplication = createAsyncThunk(
    "group/handleGroupApplication",
    async (data: GroupApplicationHandle, thunkAPI) => {
        try {
            const response = await post(`${URL}/handle`, data);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const groupApplicationSlice = createSlice({
    name: 'groupApplication',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getGroupApplication.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupApplication.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupApplication.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(inviteGroupApplication.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(inviteGroupApplication.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(inviteGroupApplication.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(handleGroupApplication.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(handleGroupApplication.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(handleGroupApplication.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { } = groupApplicationSlice.actions;
export default groupApplicationSlice.reducer;
