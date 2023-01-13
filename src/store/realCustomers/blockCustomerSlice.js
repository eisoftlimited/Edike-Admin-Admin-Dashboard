import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const blockCustomer = createAsyncThunk('customerBlock/blockCustomer', async ({token, id}, {rejectWithValue})=> {
    
    // console.log('In the thunk: ', {token, id});

    try {
        const response = await axios({
            url: `http://44.201.245.105:9527/edike/api/v1/users/admin/block/customer/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token
            },
            data: {
                status: 'blocked'
            }
        });

        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const blockCustomerSlice = createSlice({
    name: 'customerBlock',
    initialState: {
        loading: false,
        error: '',
        blockMsg: null
    },
    reducers: {
        resetBlockState: state=> {
            state.loading = false;
            state.error = '';
            state.blockMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(blockCustomer.pending, state => {
            state.loading = true;
        })
        builder.addCase(blockCustomer.fulfilled, (state, action)=> {
            state.loading = false;
            state.blockMsg = action.payload && action.payload.msg;
            // console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(blockCustomer.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload;
            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const blockCustomerReducer = blockCustomerSlice.reducer;
export const blockCustomerActions = blockCustomerSlice.actions;



