import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";

export const loanComplete = createAsyncThunk('completeLoan/loanComplete', async ({token, id}, {rejectWithValue})=> {
    try { // {{BASEURL}}/loans/admin/complete/
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/complete/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-auth-token': token
            }
        });

        return response.data;
    } catch(err) {
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
    extraReducers: (builder => {
        builder.addCase(loanComplete.pending, state => {
            state.loading = true;
        });
        builder.addCase(loanComplete.fulfilled, (state, action)=> {
            state.loading = false;
            state.loan = action.payload && action.payload;

            // console.log('In the fulfilled block: ', action.payload);
        });
        builder.addCase(loanComplete.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const completeTheLoanReducer = completeLoanSlice.reducer;
export const completeTheLoanActions = completeLoanSlice.actions;


