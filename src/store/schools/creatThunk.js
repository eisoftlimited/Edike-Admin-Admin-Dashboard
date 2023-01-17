// import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { EDUKE_URL } from '../url';

export const createAsyncThunkHandler = (endpoint, reqMethod) => (async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    // console.log('In the thunk: ',data);

    const method = reqMethod ? reqMethod : 'POST';

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/school/admin/${endpoint}`,
            method,
            data,
            headers: {
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});