import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteSchool = createAsyncThunk('schoolDelete/deleteSchool', async ({id, token}, { rejectWithValue }) => {


    try {
        const response = await axios({
            url: `https://edikeatadmin.onrender.com/edike/api/v1/school/admin/delete/${id}`,
            method: 'DELETE',
            headers: {
                'x-auth-admin-token': token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const deleteSchoolSlice = createSlice({
    name: 'schoolDelete',
    initialState: {
        loading: false,
        error: '',
        deleteMsg: null
    },
    reducers: {
        resetDeleteState: state=> {
            state.loading = false;
            state.deleteMsg = '';
            state.error = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(deleteSchool.pending, state=> {
            state.loading = true;
        })
        builder.addCase(deleteSchool.fulfilled, (state, action)=> {
            state.loading = false;
            state.deleteMsg = action.payload && action.payload.msg;
            // console.log(action.payload)
        })
        builder.addCase(deleteSchool.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            console.log(action.payload);
        })
    })
});


export const deleteSchoolReducer = deleteSchoolSlice.reducer;
export const deleteSchoolActions = deleteSchoolSlice.actions;

