import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroupMemberState, GroupMemberStateInitial } from "@/model/redux/GroupMember";
import { get } from "@/utils/request";
import { checkResponse } from "./sliceHelper";

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
    }
});

export const { } = groupMemberSlice.actions;
export default groupMemberSlice.reducer;
