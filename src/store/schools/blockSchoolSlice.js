import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const blockSchool = createAsyncThunk('schoolBlock/blockSchool', async ({ id, token }, { rejectWithValue }) => {

    console.log('School id: ', id)

    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/school/admin/block/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token,
                'Content-Type': 'application/json'
            },
            data: {
                'status': 'blocked'
            }
        });

        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const blockSchoolSlice = createSlice({
    name: 'schoolBlock',
    initialState: {
        loading: false,
        error: '',
        blockMsg: null
    },
    reducers: {
        resetBlockState: state => {
            state.loading = false;
            state.blockMsg = '';
            state.error = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(blockSchool.pending, state => {
            state.loading = true;
            state.blockMsg = '';
            state.error = '';
        })
        builder.addCase(blockSchool.fulfilled, (state, action) => {
            state.loading = false;
            state.blockMsg = action.payload && action.payload;
            // console.log('In the fulfilled: ',action.payload);
            // console.log('The action object in the fulfilled: ', action);

        })
        builder.addCase(blockSchool.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            console.log('In the rejected: ',action.payload);
            console.log('The action object in the rejected: ', action);
        })
    })
});


export const blockSchoolReducer = blockSchoolSlice.reducer;
export const blockSchoolActions = blockSchoolSlice.actions;

