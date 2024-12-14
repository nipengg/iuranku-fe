import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@/utils/request";
import { checkResponse } from "./sliceHelper";
import { GroupTuitionSettingState, GroupTuitionSettingStateInitial } from "@/model/redux/GroupTuitionSetting";
import { InsertUpdateGroupTuitionSetting } from "@/model/Master/GroupTuitionSetting";

const initialState: GroupTuitionSettingState = { ...GroupTuitionSettingStateInitial };
const URL = `${API_URL}/group/tuition-setting`;

export const getGroupTuitionSetting = createAsyncThunk(
    "group/getGroupTuitionSetting",
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

export const insertUpdateGroupTuitionSetting = createAsyncThunk(
    "group/insertUpdateGroupTuitionSetting",
    async (data: InsertUpdateGroupTuitionSetting, thunkAPI) => {
        try {
            const response = await post(`${URL}/update`, data);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const groupTuitionSettingSlice = createSlice({
    name: 'groupTuitionSetting',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getGroupTuitionSetting.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupTuitionSetting.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupTuitionSetting.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(insertUpdateGroupTuitionSetting.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(insertUpdateGroupTuitionSetting.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(insertUpdateGroupTuitionSetting.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

    }
});

export const { } = groupTuitionSettingSlice.actions;
export default groupTuitionSettingSlice.reducer;
