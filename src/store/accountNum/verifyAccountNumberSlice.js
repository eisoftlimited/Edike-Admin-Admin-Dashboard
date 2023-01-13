import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const verifyAccountNumber = createAsyncThunk('verifyAcc/verifyAccountNumber', async (data, { rejectWithValue }) => {

    // console.log('In the thunk: ', data);

    try {
        const response = await axios({
            url: 'http://44.201.245.105:9527/edike/api/v1/school/admin/verify/accountNumber',
            method: 'POST',
            headers: {
                // 'x-auth-admin-token': token,
                'Content-Type': 'application/json'
            },
            data
        });

        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const verifyAccNumberSlice = createSlice({
    name: 'verifyAcc',
    initialState: {
        loading: false,
        error: '',
        bankDetails: null
    },
    extraReducers: (builder => {
        builder.addCase(verifyAccountNumber.pending, state => {
            state.loading = true;
            state.bankDetails = null;
            state.error = '';
        })
        builder.addCase(verifyAccountNumber.fulfilled, (state, action) => {
            state.loading = false;
            state.bankDetails = action.payload && action.payload.ans && action.payload.ans.data;
            // console.log('In the fulfilled block: ', action.payload.ans.data);
        })
        builder.addCase(verifyAccountNumber.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log(action.payload);
        })
    })
});



export const verifyAccNumberReducer = verifyAccNumberSlice.reducer;
export const verifyAccNumberActions = verifyAccNumberSlice.actions;
