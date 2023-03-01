import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const declineDueToCardRequest = createAsyncThunk('declineDueCard/declineDueToCardRequest', async ({id, message, token}, {rejectWithvalue})=> {
    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/loans/admin/decline/card/${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            },
            data: {
                message: message
            }
        });

        return response.data;
    } catch(err) {
        return rejectWithvalue(err.response.data);
    }
});


const declineDueToCard = createSlice({
    name: 'declineDueCard',
    initialState: {
        loading: false,
        error: '',
        data: null
    },
    reducers: {
        resetLoanDueCardState: (state, action)=> {
            state.loading = false;
            state.data = null;
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(declineDueToCardRequest.pending, state=> {
            state.loading = true;
            state.data = null;
            state.error = '';
        })
        builder.addCase(declineDueToCardRequest.fulfilled, (state, action)=> {
            state.loading = false;
            state.data = action.payload && action.payload;

            console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(declineDueToCardRequest.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload.data;

            console.log('In the rejected block: ', action.payload);
        })
    }
});

export const declineDueCardReducer = declineDueToCard.reducer;
export const declineDueCardActions = declineDueToCard.actions;
