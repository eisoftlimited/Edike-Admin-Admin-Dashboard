import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EDUKE_URL } from '../url';

export const updateSchool = createAsyncThunk('schoolEdit/updateSchool', async ({id, token, data}, { rejectWithValue }) => {

    // console.log('In the updating thunk: ', data);

    // for(let d of data) {
    //     console.log(`${d[0]}===${d[1]}`);
    // }

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/school/admin/update/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token,
                'Content-Type': 'application/json'
            },
            data
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const updateSchoolSlice = createSlice({
    name: 'schoolEdit',
    initialState: {
        loading: false,
        error: '',
        data: null
    },
    reducers: {
        resetState: state => {
            state.error = '';
        }
    }
    ,
    extraReducers: (builder => {
        builder.addCase(updateSchool.pending, state=> {
            state.loading = true;
        })
        builder.addCase(updateSchool.fulfilled, (state, action)=> {
            state.loading = false;
            state.data = action.payload && action.payload;
            // console.log(action.payload)
        })
        builder.addCase(updateSchool.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log(action.payload);
        })
    })
});


export const updateSchoolReducer = updateSchoolSlice.reducer;
export const updateSchoolActions = updateSchoolSlice.actions;