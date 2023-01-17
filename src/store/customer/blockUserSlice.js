import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const blockUser = createAsyncThunk('userBlock/blockUser', async ({id, token}, {rejectWithValue})=> {

    // console.log('In the thunk function: ', {id, token});

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/auth/admin/user/blocked/${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            },
            data: {
                status:'blocked'
            }
        });

        return response.data;
    } catch(err) {
        return rejectWithValue(err.response.data);
    }
});


const blockUserSlice = createSlice({
    name: 'userBlock', 
    initialState: {
        loading: false,
        error: '',
        blockMsg: ''
    },
    reducers: {
        resetState : state => {
            state.loading = false;
            state.error = '';
            state.blockMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(blockUser.pending, state => {
            state.loading = true;
            state.blockMsg = '';
            state.error = '';
        })
        builder.addCase(blockUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.blockMsg = action.payload && action.payload.msg;
            // console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(blockUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});

export const blockUserReducer = blockUserSlice.reducer;
export const blockUserActions = blockUserSlice.actions;


