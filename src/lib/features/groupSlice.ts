import { API_URL } from "@/constant";
import { GroupState, GroupStateInitial } from "@/model/redux/Group";
import { get } from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: GroupState = { ...GroupStateInitial };
const URL = `${API_URL}/group`;

export const getGroupMember = createAsyncThunk(
    "group/getGroup",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/getGroup`, params);
            return response;
        } catch (err: any) {
            if (!err.response) throw err;
            throw thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const groupSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Get Group Member
        builder.addCase(getGroupMember.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupMember.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupMember.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export const { } = groupSlice.actions;
export default groupSlice.reducer;