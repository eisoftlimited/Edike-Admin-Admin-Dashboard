import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const singleCustomer = createAsyncThunk('customerSingle/singleCustomer', async ({token, id}, {rejectWithValue})=> {
    console.log('IN the thunk: ', {id, token});
    
    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/users/admin/get-a-customer/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            }
        });

        console.log(response.data);

        return response.data;

    }catch(err) {
        return rejectWithValue(err.response.data);
    }
});

const singleCustomerSlice = createSlice({
    name: 'customerSingle',
    initialState: {
        loading: false,
        error: '',
        all: null
    },
    extraReducers: (builder => {
        builder.addCase(singleCustomer.pending, state => {
            state.loading = true;
            console.log('Pending');
        })
        builder.addCase(singleCustomer.fulfilled, (state, action)=> {
            state.loading = false;
            state.all = action.payload && action.payload.all;

            // action.payload && action.payload.all && action.payload.all[1] && action.payload.all[1].loan


            // const customer = action.payload && action.payload.all && action.payload.all.length > 0 && action.payload.all[0].user;
            // const 

            console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(singleCustomer.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            console.log('In the rejected block: ', action.payload);
        })
    })
});


export const singleCustomerReducer = singleCustomerSlice.reducer;
export const singleCustomerActions = singleCustomerSlice.actions;

