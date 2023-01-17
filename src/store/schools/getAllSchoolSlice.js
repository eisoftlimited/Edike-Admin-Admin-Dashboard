import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EDUKE_URL } from "../url";

export const getSchools = createAsyncThunk('school/getSchools', async ({token}, { rejectWithValue }) => {

    // console.log('In the thunk: ',data);

    try {
        const response = await axios({
            url: `${EDUKE_URL}/edike/api/v1/school/admin/all`,
            // url: `https://edikeatadmin.onrender.com/edike/api/v1/school/admin/all`,
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


const getSchoolsSlice = createSlice({
    name: 'schoolGetAll',
    initialState: {
        allSchools: null,
        activeSchools: null,
        blockedSchools: null,
        loading: false,
        error: ''
    },
    extraReducers: (builder => {
        // FETCH SCHOOLS REQUEST
        builder.addCase(getSchools.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getSchools.fulfilled, (state, action) => {
            state.loading = false;
            state.allSchools = action.payload && action.payload.edikeschools;

            if(action.payload && action.payload.edikeschools && action.payload.edikeschools.length > 0) {
                const activeSch = action.payload && action.payload.edikeschools.filter(school => {
                    return school.status === 'active';
                });
    
                const blockedSch = action.payload && action.payload.edikeschools.filter(school => {
                    return school.status === 'blocked';
                });
                state.activeSchools = activeSch;
                state.blockedSchools = blockedSch;
            } else {
                state.activeSchools = [];
                state.blockedSchools = [];
            }

            // console.log('In get all schools: Active schools ', action.payload);
        })
        builder.addCase(getSchools.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload && action.payload.msg;

            // console.log('In the  rejected: ', action.payload);
        })
        
    })
});

export const getSchoolsReducer = getSchoolsSlice.reducer;
export const getSchoolsActions = getSchoolsSlice.actions;

