import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";


// const url = 'https://edikeatadmin.onrender.com/edike/api/v1';

const createAsyncThunkHandler = (endpoint, reqMethod ) => (async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    // console.log('In the thunk: ',data);

    const method = reqMethod ? reqMethod : 'POST';

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/auth/admin/${endpoint}`,
            method,
            data,
            headers: {
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const signUserIn = createAsyncThunk('auth/signUserIn', createAsyncThunkHandler('login'));
export const activateUser = createAsyncThunk('auth/activateUser', createAsyncThunkHandler('activate'));
export const loadAdmin = createAsyncThunk('auth/loadAdmin', createAsyncThunkHandler('user', 'GET'));
export const forgotPassword = createAsyncThunk('auth/forgotPassword', createAsyncThunkHandler('forgot-password'));
export const forgotPasswordOTPP = createAsyncThunk('auth/reset', createAsyncThunkHandler('reset')); ///resend/reset-otp
export const resetPassword = createAsyncThunk('auth/resetPassword', createAsyncThunkHandler('reset-password'));
export const resendAdminVerification = createAsyncThunk('auth/resendAdminVerification', createAsyncThunkHandler('resend/verify-otp'));
export const resendAdminForgotPassword = createAsyncThunk('auth/resendAdminForgotPassword', createAsyncThunkHandler('resend/reset-otp'));


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        error: '',
        loading: false,
        loggedInMessage: '',
        token: null,
        user: null
    },
    reducers: {
        clearLoginUpdateState: state => {
            state.error = '';
            state.loggedInMessage = '';
        },
        setToken: (state, action)=> {
            state.token = action.payload && action.payload.token;
        },
        clearToken: state => {
            state.token = null;
        },
        clearErrorState: state => {
            state.error = '';
        }
    },
    extraReducers: (builder => {
        // SIGN USER IN
        builder.addCase(signUserIn.pending, (state, action) => {
            state.loading = true;
            state.loggedInMessage = '';
        })
        builder.addCase(signUserIn.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload && action.payload.msg;

            console.log('In the fulfilled signin: ',action.payload);

        })
        builder.addCase(signUserIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            console.log('In the rejected signin: ',action.payload);
        })

        // ACTIVATE
        builder.addCase(activateUser.pending,  (state, action) => {
            state.loading = true;
            state.token = action.payload;
        })
        builder.addCase(activateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload && action.payload.msg;
            state.token = action.payload && action.payload.token;
            localStorage.removeItem('edike-admin-email');
            localStorage.setItem('edike-admin-token', action.payload.token);
            // localStorage.setItem('expires-in', JSON.stringify(Date.now() + (1.9 * 60 * 60 * 1000)));
            // console.log(action.payload);

            console.log('In the fuilfilled: ',action.payload);
        })
        builder.addCase(activateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
        })
        

        // LOAD ADMIN
        builder.addCase(loadAdmin.pending,  (state, action) => {
            state.loading = true;
        })
        builder.addCase(loadAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload && action.payload.msg;
            
            if(action.payload && action.payload.usercfo) {
                state.user = action.payload && action.payload.usercfo;
            } else if(action.payload && action.payload.user) {
                state.user = action.payload && action.payload.user;
            }

            state.token = action.payload && action.payload.token;
            // console.log('In the fulfilled block: ',action.payload);
        })
        builder.addCase(loadAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            if(action.payload && action.payload.msg === 'Not Authorized') {
                localStorage.removeItem('edike-admin-token');
            }

            // console.log('In the rejected block: ', action.payload);
        })

        // RESEND ADMIN VERIFICATION OTP
        builder.addCase(resendAdminVerification.pending,  (state) => {
            state.loading = true;
        })
        builder.addCase(resendAdminVerification.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload && action.payload.msg;
            state.user = action.payload && action.payload.user;
            state.token = action.payload && action.payload.token;
            localStorage.setItem('edike-token', action.payload.token);
            localStorage.setItem('edike-admin-token', action.payload.token);
            // console.log(action.payload);
        })
        builder.addCase(resendAdminVerification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
        })

        // FORGOT PASSWORD
        builder.addCase(forgotPassword.pending,  (state, action) => {
            state.loading = true;
        })
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload.msg;
            // localStorage.removeItem('edike-admin-email');
            // console.log(action.payload);
        })
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            // console.log(state.error.msg);
        })

        // FORGOT PASSWORD  OTP REQUEST
        builder.addCase(forgotPasswordOTPP.pending,  (state, action) => {
            state.loading = true;
            state.token = action.payload;
        })
        builder.addCase(forgotPasswordOTPP.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload.msg;
            state.token = action.payload.token;
            // console.log(action.payload);
        })
        builder.addCase(forgotPasswordOTPP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            // console.log(action.payload.msg)
        })

        // RESEND FORGOT PASSWORD OPT
        builder.addCase(resendAdminForgotPassword.pending,  (state) => {
            state.loading = true;
        })
        builder.addCase(resendAdminForgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload && action.payload.msg;
            state.user = action.payload && action.payload.user;
            state.token = action.payload && action.payload.token;
            // localStorage.setItem('edike-token', action.payload.token);
            // localStorage.setItem('edike-admin-token', action.payload.token);
            // console.log(action.payload);
        })
        builder.addCase(resendAdminForgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
        })

        // RESET PASSWORD REQUEST
        builder.addCase(resetPassword.pending,  (state) => {
            state.loading = true;
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInMessage = action.payload.msg;
            // console.log(action.payload);
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            // console.log(action.payload)
        })
    })
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;