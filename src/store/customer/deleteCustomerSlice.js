import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteUser = createAsyncThunk('userDelete/deleteUser', async ({id, token}, { rejectWithValue }) => {

    // console.log('In the thunk: ',{id, token});

    try {
        const response = await axios({
            url: `http://44.201.245.105:9527/edike/api/v1/auth/admin/user/delete-admin/${id}`,
            method: 'DELETE',
            headers: {
                'x-auth-admin-token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const deleteUserSlice = createSlice({
    name: 'userDelete',
    initialState: {
        loading: false,
        error: '',
        deleteMsg: null
    },
    reducers: {
        resetDeleteState: state=> {
            state.loading = false;
            state.deleteMsg = '';
            state.error = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(deleteUser.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.deleteMsg = action.payload && action.payload.msg;
            // console.log('In the fulfilled block: ',action.payload);
        })
        builder.addCase(deleteUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log('In the rejected block: ', action.payload);
        })
    })
});



export const deleteUserReducer = deleteUserSlice.reducer;
export const deleteUserActions = deleteUserSlice.actions;
