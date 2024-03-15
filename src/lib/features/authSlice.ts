import { User } from "@/model/Master/UserModel";
import { AuthState, AuthStateInitial } from "@/model/redux/Auth";
import { API_URL, LOCAL_STORAGE_KEY } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { saveToken } from "@/utils/userSession";

const initialState: AuthState = { ...AuthStateInitial }

export const login = createAsyncThunk(
    "auth/login",
    async (data, opts) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email: data });
            return response.data;
        } catch (err: any) {
            if (!err.response) throw err;
            return opts.rejectWithValue(err.response.data);
        }
    }
) as any;

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            const user: User = action.payload.data;
            state.user = user;
            saveToken(action.payload.data.token)
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;