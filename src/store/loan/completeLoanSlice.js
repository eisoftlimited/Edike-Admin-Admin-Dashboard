import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";

export const loanComplete = createAsyncThunk('completeLoan/loanComplete', async ({ token, id }, { rejectWithValue }) => {
    
    console.log({token});
    
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/complete/${id}`,
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


const completeLoanSlice = createSlice({
    name: 'completeLoan',
    initialState: {
        loading: false,
        error: '',
        loan: null
    },
    reducers: {
        resetCompleteState: state => {
            state.loading = false;
            state.error = '';
            state.loan = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(loanComplete.pending, state => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(loanComplete.fulfilled, (state, action) => {
            state.loading = false;
            state.loan = action.payload && action.payload;

            console.log('In the fulfilled block: ', action.payload);
        });
        builder.addCase(loanComplete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            console.log('In the rejected block: ', action.payload);
        })
    })
});


export const completeLoanReducer = completeLoanSlice.reducer;
export const completeLoanActions = completeLoanSlice.actions;


