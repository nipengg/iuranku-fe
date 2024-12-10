import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroupApplicationState, GroupApplicationStateInitial } from "@/model/redux/GroupApplication";
import { checkResponse } from "./sliceHelper";
import { get } from "@/utils/request";

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

const groupApplicationSlice = createSlice({
    name: 'groupApplication',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Get Group Members
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
    }
});

export const { } = groupApplicationSlice.actions;
export default groupApplicationSlice.reducer;
