import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";

export const loanDecline = createAsyncThunk('declineLoan/loanDecline', async ({token, id, message}, {rejectWithValue})=> {
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/decline/${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            },
            data: {
                message
            }
        });

        return response.data;
    } catch(err) {
        return rejectWithValue(err.response.data);
    }
});


const declineLoanSlice = createSlice({
    name: 'declineLoan',
    initialState: {
        loading: false,
        error: '',
        declineLoanMsg: null
    },
    reducers: {
        resetDeclineState: state => {
            state.loading = false;
            state.error = '';
            state.declineLoanMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(loanDecline.pending, state => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(loanDecline.fulfilled, (state, action)=> {
            state.loading = false;
            state.declineLoanMsg = action.payload && action.payload.msg;

            // console.log('In the fulfilled block: ', action.payload);
        });
        builder.addCase(loanDecline.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const declineLoanReducer = declineLoanSlice.reducer;
export const declineLoanActions = declineLoanSlice.actions;


