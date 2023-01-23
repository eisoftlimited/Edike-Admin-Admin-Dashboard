import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const loanManagement = createAsyncThunk('getLoans/loanManagement', async (token, {rejectWithValue})=> {
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/get-all-loans`,
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

const getLoansSlice = createSlice({
    name: 'getLoans',
    initialState: {
        loading: false,
        error: '',
        allLoans: null,
        ongoingLoans: null,
        pendingLoans: null,
        declinedLoans: null,
        completedLoans: null,
        defaultedLoans: null
    },
    extraReducers: (builder => {
        builder.addCase(loanManagement.pending, state => {
            state.loading = true;
        });
        builder.addCase(loanManagement.fulfilled, (state, action)=> {
            state.loading = false;
            state.allLoans = action.payload && action.payload.loans;

            const ongoingLns = action.payload && action.payload.loans && action.payload.loans.filter(loan => {
                return loan.status === 'ongoing';
            });

            const pendingLns = action.payload && action.payload.loans && action.payload.loans.filter(loan => {
                return loan.status === 'pending';
            });
            const defaultedLns = action.payload && action.payload.loans && action.payload.loans.filter(loan => {
                return loan.status === 'defaulted';
            });

            const declinedLns = action.payload && action.payload.loans && action.payload.loans.filter(loan => {
                return loan.status === 'declined';
            });

            const completedLns = action.payload && action.payload.loans && action.payload.loans.filter(loan => {
                return loan.status === 'completed';
            });

            state.defaultedLoans = defaultedLns;
            state.ongoingLoans = ongoingLns; // ongoing
            state.pendingLoans = pendingLns;
            state.completedLoans = completedLns;
            state.declinedLoans = declinedLns;

            // console.log('In the fulfilled block: ', action.payload.loans);
        });
        builder.addCase(loanManagement.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const getLoansReducer = getLoansSlice.reducer;
export const getLoansActions = getLoansSlice.actions;


