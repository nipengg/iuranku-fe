import { MappingUserGoogleToRequestObject, MappingUserToFormData, User, UserInitial, UserLoginForm, UserRegister, UserResponseLogin } from "@/model/Master/UserModel";
import { AuthState, AuthStateInitial } from "@/model/redux/Auth";
import { API_URL, GOOGLE_USER_INFO_API, STATUS_SIGNIN } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { getTokenAsync, removeToken, removeTokenGoogle, saveToken, saveTokenGoogle } from "../../utils/userSession";
import { TokenResponse } from "@react-oauth/google";
import { StatusCodes } from "http-status-codes";
import { get, post } from "@/utils/request";

const initialState: AuthState = { ...AuthStateInitial }

export const login = createAsyncThunk(
    "auth/login",
    async (data: UserLoginForm, thunkAPI) => {
        try {
            const response = await post(`${API_URL}/login`, data);         

            const responseForm: UserResponseLogin = { ...response };

            await saveToken(responseForm.result.access_token);

            return response;
        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response);
        }
    }
) as any;

export const authGoogle = createAsyncThunk(
    "auth/login/google",
    async (tokenResponse: TokenResponse, thunkAPI) => {
        try {
            const userInfo: any = await axios.get(GOOGLE_USER_INFO_API, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
            });

            const reqObj: object = await MappingUserGoogleToRequestObject(userInfo.data.name, userInfo.data.email);

            const response = await post(`${API_URL}/googleOAuth`, {
                ...reqObj, 
            })

            if (tokenResponse !== undefined)
                saveTokenGoogle(tokenResponse);

            if (response.meta.message == STATUS_SIGNIN.Authenticated)
                await saveToken(response.result.access_token);

            return response;
        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response);
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

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {

            const access_token: any = await getTokenAsync();

            const response = await post(`${API_URL}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${access_token.value}`,
                    Accept: 'application/json',
                },
            });

            if (response.meta.code == StatusCodes.OK) {
                await removeToken();
                await removeTokenGoogle();
            }

            return response;

        } catch (err: any) {
            if (!err.response) throw err;
            return thunkAPI.rejectWithValue(err.response);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearUserState: (state) => {
            return initialState;
        },
        setTokenExpire: (state) => {
            state.isTokenExpire = true;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.result.user;
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
            if (action.payload.meta.message == STATUS_SIGNIN.Authenticated) {
                state.user = action.payload.result.user;
            } else if (action.payload.meta.message == STATUS_SIGNIN.Register) {
                state.user.name = action.payload.result.user.name;
                state.user.email = action.payload.result.user.email;
            }
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

        // Logout
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user = UserInitial;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export const { clearUserState, setTokenExpire } = authSlice.actions;
export default authSlice.reducer;