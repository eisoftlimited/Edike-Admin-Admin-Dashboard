import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const singleLoan = createAsyncThunk('getLoan/singleLoan', async ({token, id, idMain}, {rejectWithValue})=> {

    // console.log('In the thunk: ', {token});
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/getone/${id}/${idMain}`,
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

const getLoanSlice = createSlice({
    name: 'getLoan',
    initialState: {
        loading: false,
        error: '',
        loan: null,
        user: null,
        transaction: null
    },
    extraReducers: (builder => {
        builder.addCase(singleLoan.pending, state => {
            state.loading = true;
            state.transaction = null;
        });
        builder.addCase(singleLoan.fulfilled, (state, action)=> {
            state.loading = false;
            state.user = action.payload && action.payload.all && action.payload.all[0] && action.payload.all[0].user;
            state.loan = action.payload && action.payload.all && action.payload.all[1] && action.payload.all[1].loan;
            state.transaction = action.payload && action.payload.all && action.payload.all[2] && action.payload.all[2].transaction;

            // console.log('In the fulfilled block: ', action.payload && action.payload.all);

            // console.log('User data: ', state.user, 'Loan data: ', state.loan);
        });
        builder.addCase(singleLoan.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const getLoanReducer = getLoanSlice.reducer;
export const getLoanActions = getLoanSlice.actions;


