import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const activateCustomer = createAsyncThunk('customerActivate/activateCustomer', async ({token, id}, {rejectWithValue})=> {
    // console.log('In the thunk token: ', {token});
    
    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/users/admin/activate/customer/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token
            },
            data: {
                status: 'active'
            }
        });

        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const activateCustomerSlice = createSlice({
    name: 'customerActivate',
    initialState: {
        loading: false,
        error: '',
        activateMsg: null
    },
    reducers: {
        resetActivatedState: state => {
            state.loading = false;
            state.error = '';
            state.activateMsg = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(activateCustomer.pending, state => {
            state.loading = true;
        })
        builder.addCase(activateCustomer.fulfilled, (state, action)=> {
            state.loading = false;
            state.activateMsg = action.payload && action.payload.msg;
            // console.log('In the fulfilled block: ', action.payload);
        })
        builder.addCase(activateCustomer.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload;
            // console.log('In the rejected block: ', action.payload);
        })
    })
});


export const activateCustomerReducer = activateCustomerSlice.reducer;
export const activateCustomerActions = activateCustomerSlice.actions;
