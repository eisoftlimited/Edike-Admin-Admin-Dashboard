import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const activateSchool = createAsyncThunk('schoolActivate/activateSchool', async ({ id, token }, { rejectWithValue }) => {

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/school/admin/activate/${id}`,
            method: 'POST',
            headers: {
                'x-auth-admin-token': token
            },
            data: {
                'status': 'active'
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const activateSchoolSlice = createSlice({
    name: 'schoolActivate',
    initialState: {
        loading: false,
        error: '',
        activateMsg: null
    },
    reducers: {
        resetBlockState: state => {
            state.loading = false;
            state.activateMsg = '';
            state.error = '';
        }
    },
    extraReducers: (builder => {
        builder.addCase(activateSchool.pending, state => {
            state.loading = true;
            state.activateMsg = '';
            state.error = '';
        })
        builder.addCase(activateSchool.fulfilled, (state, action) => {
            state.loading = false;
            state.activateMsg = action.payload;
            // console.log('In the fulfilled block: ',action.payload);
            // console.log('The action object in the fulfilled: ', action);
        })
        builder.addCase(activateSchool.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;
            // console.log('In the rejected block: ',action.payload);
            // console.log('The action object in the fulfilled: ', action);
        })
    })
});


export const activateSchoolReducer = activateSchoolSlice.reducer;
export const activateSchoolActions = activateSchoolSlice.actions;

