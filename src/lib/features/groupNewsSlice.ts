import { API_URL } from "@/constant";
import { GroupNewsState, GroupNewsStateInitial } from "@/model/redux/GroupNews";
import { get } from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkResponse } from "./sliceHelper";

const initialState: GroupNewsState = { ...GroupNewsStateInitial };
const URL = `${API_URL}/group/news`;

export const getGroupNews = createAsyncThunk(
"group/getGroupNews",
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

const groupNewsSlice = createSlice({
    name: 'groupNews',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        // Get Group Member
        builder.addCase(getGroupNews.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupNews.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupNews.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
})
