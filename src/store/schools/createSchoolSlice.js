import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const createSchool = createAsyncThunk('school/createSchool', createAsyncThunkHandler('create'));

export const createSchool = createAsyncThunk('schoolPost/createSchool', async ({data, token}, { rejectWithValue }) => {

    // console.log('In the thunk: ',token);

    try {
        const response = await axios({
            url: `http://44.201.245.105:9527/edike/api/v1/school/admin/create`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const createSchoolSlice = createSlice({
    name: 'schoolPost',
    initialState: {
        loading: false,
        error: '',
        school: null
    },
    reducers: {
        resetState: state => {
            state.error = '';
        }
    },
    extraReducers: (builder => {
        // CREATE SCHOOL REQUEST
        builder.addCase(createSchool.pending, (state, action) => {
            state.loading = true;
            state.loggedInMessage = '';
            // console.log('In the pending: ',action.payload)
        })
        builder.addCase(createSchool.fulfilled, (state, action) => {
            state.loading = false;
            state.school = action.payload && action.payload.edikeschools;
            // console.log('In the fufilled: ',action.payload.edikeschools);
        })
        builder.addCase(createSchool.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log('Rejected: ', state.error);
        })
    })
});

export const createSchoolReducer = createSchoolSlice.reducer;
export const createSchoolActions = createSchoolSlice.actions;
