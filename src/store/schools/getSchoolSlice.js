import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const getSchool = createAsyncThunk('school/getSchool', async ({id, token}, { rejectWithValue }) => {

    // console.log('In the thunk: ',data);

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/school/admin/get/${id}`,
            method: 'GET',
            headers: {
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const getSchoolSlice = createSlice({
    name: 'schoolGet',
    initialState: {
        singleSchool: null,
        loading: false,
        error: ''
    },
    reducers: {
        resetGetSchoolState: state => {
            state.singleSchool = null;
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: (builder => {
        // FETCH SCHOOLS REQUEST
        builder.addCase(getSchool.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getSchool.fulfilled, (state, action) => {
            state.loading = false;
            state.singleSchool = action.payload;
            // console.log('Fulfilled action: ', action.payload);
        })
        builder.addCase(getSchool.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log('In the error: ',action.payload);
        })
    })
});

export const getSchoolReducer = getSchoolSlice.reducer;
export const getSchoolActions = getSchoolSlice.actions;

