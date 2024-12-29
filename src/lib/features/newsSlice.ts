import { API_URL } from "@/constant";
import { get } from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkResponse } from "./sliceHelper";
import { NewsState, NewsStateInitial } from "@/model/redux/News";

const initialState: NewsState = { ...NewsStateInitial };
const URL = `${API_URL}/news`;

export const getNews = createAsyncThunk(
    "news/getNews",
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

export const getNewsDetail = createAsyncThunk(
    "news/getNewsDetail",
    async (params: object, thunkAPI) => {
        try {
            const response = await get(`${URL}/detail`, params);
            checkResponse(response);
            return response;
        } catch (err: any) {
            throw thunkAPI.rejectWithValue(err);
        }
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNews.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getNews.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getNews.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getNewsDetail.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getNewsDetail.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getNewsDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

    }
});

export const { } = newsSlice.actions;
export default newsSlice.reducer;
