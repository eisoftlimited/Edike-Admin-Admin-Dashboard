import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loanComplete = createAsyncThunk('completeLoan/loanComplete', async ({token, id}, {rejectWithValue})=> {
    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/loans/admin/decline/${id}`,
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


export const completeLoanReducer = completeLoanSlice.reducer;
export const completeLoanActions = completeLoanSlice.actions;


