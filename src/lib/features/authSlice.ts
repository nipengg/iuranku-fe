import { MappingUserGoogleToRequestObject, MappingUserToFormData, User, UserRegister, UserResponseLogin } from "@/model/Master/UserModel";
import { AuthState, AuthStateInitial } from "@/model/redux/Auth";
import { API_URL, LOCAL_STORAGE_KEY } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { saveToken, saveTokenGoogle } from "../../utils/userSession";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const initialState: AuthState = { ...AuthStateInitial }

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email: data });
            return response.data;
        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
) as any;

export const authGoogle = createAsyncThunk(
    "auth/login/google",
    async (credentialResponse: CredentialResponse, thunkAPI) => {
        try {
            const decode: any = jwtDecode(JSON.stringify(credentialResponse.credential));
            const reqObj: object = await MappingUserGoogleToRequestObject(decode.name, decode.email);

            const response: AxiosResponse<any, any> = await axios.post(`${API_URL}/googleOAuth`, {
                ...reqObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (credentialResponse.credential !== undefined)
                saveTokenGoogle(credentialResponse.credential);

            return response.data;
        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (data: UserRegister, thunkAPI) => {
        try {

            const formData: FormData = MappingUserToFormData(data);

            const response: AxiosResponse<any, any> = await axios.post(`${API_URL}/register`, {
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const userResponse: UserResponseLogin = response.data;

            return userResponse;
        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearUserState: (state) => {
            state = { ...AuthStateInitial }
        },
        logout: (state) => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return initialState;
        }
    },
    extraReducers: (builder) => {
        // Login
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

        // Auth Google
        builder.addCase(authGoogle.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(authGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.name = action.payload.result.user.name;
            state.user.email = action.payload.result.user.email;
        });
        builder.addCase(authGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Register
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export const { clearUserState, logout } = authSlice.actions;
export default authSlice.reducer;