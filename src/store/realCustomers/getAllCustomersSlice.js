import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllCustomers = createAsyncThunk('customerGetAll/getAllCustomers', async ({token}, { rejectWithValue })=> {

    console.log('In the thunk: ', {token});

    try {
        const response = await axios({ // /users/admin/get-all-customers
            url: `https://edikeatadmin.onrender.com/edike/api/v1/users/admin/get-all-customers`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const getAllCustomerslice = createSlice({
    name: 'customerGetAll',
    initialState: {
        loading: false,
        error: '',
        allUsers: null,
        activeUsers: null,
        blockedUsers: null
    },
    extraReducers: (builder => {
        builder.addCase(getAllCustomers.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllCustomers.fulfilled, (state, action)=> {
            state.loading = false;
            state.allUsers = action.payload && action.payload.users;
            const activeUs =  action.payload && action.payload.users.filter(user => {
                return user.status === 'active';
            });

            const blockedUs = action.payload && action.payload.users.filter(user => {
                return user.status === 'blocked';
            });

            state.activeUsers = activeUs;
            state.blockedUsers = blockedUs;


            // console.log(action.payload && action.payload.users);
        })
        builder.addCase(getAllCustomers.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log(action.payload)
        })
    })
});


export const getAllCustomersReducer = getAllCustomerslice.reducer;
export const getAllCustomersActions = getAllCustomerslice.actions;
