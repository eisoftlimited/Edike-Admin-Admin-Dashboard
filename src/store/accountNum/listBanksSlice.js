import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchBankList = createAsyncThunk('banks/fetchBankList', async(_, {rejectWithValue}) => {
    try{
        const response = await axios({
            url: 'https://edikeatadmin.onrender.com/edike/api/v1/school/admin/list/bankCode',
            method: 'GET',
            'Content-Type': 'application/json'
        });

        return response.data;

    } catch(err) {
        return rejectWithValue(err.response.data);
    }
});

const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        loading: false,
        error: '',
        banks: null
    },
    extraReducers: (builder => {
        builder.addCase(fetchBankList.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchBankList.fulfilled, (state, action)=> {
            state.loading = false;
            const banks = action.payload.msg.data.map(bank => {
                return {name: bank.name, id: bank.id, code: bank.code};
            });
            
            state.banks = banks;
            
            // console.log('In the fulfillede block: ',action.payload.msg.data);
        });
        builder.addCase(fetchBankList.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the rejected block:  ',action.payload);
        });
    })
});


export const bankListReducer = bankSlice.reducer;
export const bankListActions = bankSlice.actions;


// /school/admin/list/bankCode