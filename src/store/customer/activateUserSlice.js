import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const activateUser = createAsyncThunk('userActivate/activateUser', async ({ id, token }, { rejectWithValue }) => {
    try {

        const response = await axios({
            url: `http://44.201.245.105:9527/edike/api/v1/auth/admin/user/activate/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token,
                'Content-Type': 'application/json'
            },
            data: {
                status: 'active'
            }
        });

        return response.data;

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const activateUserSlice = createSlice({
    name: 'userActivate',
    initialState: {
        loading: false,
        error: '',
        activateMsg: ''
    },
    reducers: {
        resetState: state => {
            state.loading = false;
            state.error = '';
            state.activateMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(activateUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(activateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.activateMsg = action.payload && action.payload.msg;

            // console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(activateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejeccted block: ', action.payload);
        })
    })
});



export const activateUserReducer = activateUserSlice.reducer;
export const activateUserActions = activateUserSlice.actions;


