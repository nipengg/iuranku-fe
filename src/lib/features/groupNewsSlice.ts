import { API_URL } from "@/constant";
import { GroupNewsState, GroupNewsStateInitial } from "@/model/redux/GroupNews";
import { get, patch, post } from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkResponse } from "./sliceHelper";
import { InsertGroupNewsForm, UpdateGroupNewsForm } from "@/model/Master/GroupNews";
import { StatusCodes } from "http-status-codes";

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

export const getGroupNewsDetail = createAsyncThunk(
    "group/getGroupNewsDetail",
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

export const insertGroupNews = createAsyncThunk(
    "group/insertGroupNews",
    async (data: InsertGroupNewsForm, thunkAPI) => {
        try {
            const formData = new FormData();

            formData.append("news_title", data.news_title);
            formData.append("content", data.content);
            formData.append("image", data.image as Blob);
            formData.append("author_id", data.author_id.toString());
            formData.append("group_id", data.group_id.toString());

            const response = await post(`${URL}/store`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            checkResponse(response);

            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }

            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateGroupNews = createAsyncThunk(
    "group/updateGroupNews",
    async (data: UpdateGroupNewsForm, thunkAPI) => {
        try {
            const formData = new FormData();

            formData.append("news_title", data.news_title);
            formData.append("content", data.content);
            formData.append("author_id", data.author_id.toString());
            formData.append("group_id", data.group_id.toString());
            formData.append("group_news_id", data.group_news_id.toString());

            // Append image only if updated
            if (data.image instanceof File) {
                formData.append("image", data.image as Blob);
            }

            console.log(formData)

            const response = await post(`${URL}/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            checkResponse(response);

            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }

            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteGroupNews = createAsyncThunk(
    "group/deleteGroupNews",
    async (data: object, thunkAPI) => {
        try {

            const response = await post(`${URL}/delete`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            checkResponse(response);

            if (response.meta.code !== StatusCodes.OK) {
                throw response;
            }

            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const groupNewsSlice = createSlice({
    name: 'groupNews',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Get Group News
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

        builder.addCase(getGroupNewsDetail.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getGroupNewsDetail.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getGroupNewsDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Insert Group News
        builder.addCase(insertGroupNews.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(insertGroupNews.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(insertGroupNews.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Update Group News
        builder.addCase(updateGroupNews.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateGroupNews.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(updateGroupNews.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Delete Group News
        builder.addCase(deleteGroupNews.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteGroupNews.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteGroupNews.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

    }
});

export const { } = groupNewsSlice.actions;
export default groupNewsSlice.reducer;
