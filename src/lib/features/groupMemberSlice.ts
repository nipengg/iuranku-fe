import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroupMemberState, GroupMemberStateInitial } from "@/model/redux/GroupMember";
import { get, post } from "@/utils/request";
import { checkResponse } from "./sliceHelper";
import { LeaveGroupMember } from "@/model/Master/GroupModel";

const initialState: GroupMemberState = { ...GroupMemberStateInitial };
const URL = `${API_URL}/group/members`;

export const getGroupMembers = createAsyncThunk(
    "group/getGroupMembers",
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

export const findMembers = createAsyncThunk(
    "group/findMembers",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/find-member`, params);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

export const leaveGroup = createAsyncThunk(
    "group/leaveGroup",
    async (data: LeaveGroupMember, thunkAPI) => {
        try {
            const response = await post(`${URL}/leave`, data);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const groupMemberSlice = createSlice({
    name: 'groupMember',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Get Group Members
        builder.addCase(getGroupMembers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupMembers.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupMembers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(findMembers.pending, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(findMembers.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(findMembers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { } = groupMemberSlice.actions;
export default groupMemberSlice.reducer;
