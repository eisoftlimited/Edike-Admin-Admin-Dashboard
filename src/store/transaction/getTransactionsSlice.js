import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EDUKE_URL } from '../url';

export const getTransactionsRequest = createAsyncThunk('transactions/getTransactionsRequest', async (token, { rejectWithValue }) => {
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/auth/admin/user/transact`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            }
        });

        return response.data;
    } catch(err) {
        return rejectWithValue(err.response.data);
    }
});

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: false,
        error: '',
        data: null
    },
    extraReducers: builder => {
        builder.addCase(getTransactionsRequest.pending, state => {
            state.loading = true;
            state.error = '';
            state.data = null;
        })
        builder.addCase(getTransactionsRequest.fulfilled, (state, action)=>  {
            state.loading = false;
            state.data = action.payload && action.payload.transactions;

            // console.log('state data: ', state.data);
        })
        builder.addCase(getTransactionsRequest.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;

            console.log('error data: ', state.error);
        })
    }
});

export const transactionsReducer = transactionsSlice.reducer;
export const transactionsActions = transactionsSlice.actions;
