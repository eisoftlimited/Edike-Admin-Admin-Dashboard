import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const addUser = createAsyncThunk('userPost/addUser', async ({data, token}, { rejectWithValue })=> {

    console.log('In the thunk: ', {token});
    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/auth/admin/user/add`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const addUserSlice = createSlice({
    name: 'userPost',
    initialState: {
        loading: false,
        error: '',
        data: null
    },
    reducers: {
        resetState: state => {
            state.error = '';
            state.loading = false;
        }
    },
    extraReducers: (builder=> {
        builder.addCase(addUser.pending, state=> {
            state.loading = true;
        })
        builder.addCase(addUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.data = action.payload && action.payload.msg;
            console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(addUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            console.log('In the rejected block: ',action.payload);
        })
    })
});

export const addUserReducer = addUserSlice.reducer;
export const addUserActions = addUserSlice.actions;


