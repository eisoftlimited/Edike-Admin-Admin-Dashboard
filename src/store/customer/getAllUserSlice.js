import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";

export const getAllUsers = createAsyncThunk('userGetAll/getAllUsers', async ({token}, { rejectWithValue })=> {
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/auth/admin/all-admin-users`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const getAllUserSlice = createSlice({
    name: 'userGetAll',
    initialState: {
        loading: false,
        error: '',
        allUsers: null,
        activeUsers: null,
        blockedUsers: null
    },
    extraReducers: (builder => {
        builder.addCase(getAllUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllUsers.fulfilled, (state, action)=> {
            state.loading = false;
            state.allUsers = action.payload && action.payload.user;
            const activeUs =  action.payload && action.payload.user.filter(user => {
                return user.status === 'active';
            });

            const blockedUs = action.payload && action.payload.user.filter(user => {
                return user.status === 'blocked';
            });

            state.activeUsers = activeUs;
            state.blockedUsers = blockedUs;
            // console.log(action.payload.user);
            // console.log({activeUs, blockedUs});
        })
        builder.addCase(getAllUsers.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log(action.payload)
        })
    })
});


export const getAllUsersReducer = getAllUserSlice.reducer;
export const getAllUsersActions = getAllUserSlice.actions;
