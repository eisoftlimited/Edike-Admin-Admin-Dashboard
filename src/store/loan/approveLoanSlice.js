import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { EDUKE_URL } from "../url";

export const loanApproval = createAsyncThunk('approveLoan/loanApproval', async ({token, id}, {rejectWithValue})=> {
    
    // console.log('In the thunk: ', {token, id});
    
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/approve/${id}`,
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

const approveLoanSlice = createSlice({
    name: 'approveLoan',
    initialState: {
        loading: false,
        error: '',
        loanApprovedMsg: null
    },
    reducers: {
        resetApprovedState: state => {
            state.loading = false;
            state.error = '';
            state.loanApprovedMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(loanApproval.pending, state => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(loanApproval.fulfilled, (state, action)=> {
            state.loading = false;
            state.loanApprovedMsg = action.payload && action.payload.msg;

            // console.log('In the fulfilled block: ', action.payload);
        });
        builder.addCase(loanApproval.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const approveLoanReducer = approveLoanSlice.reducer;
export const approveLoanActions = approveLoanSlice.actions;