import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getShowrooms, updateShowroom, createShowroom } from '../api/showroom';

export const getAllShowroomAsync = createAsyncThunk('getAllBShowroomAsync', async (filter,{rejectWithValue }) => {
    try {
        const showrooms = await getShowrooms();
        return showrooms;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateShowroomAsync = createAsyncThunk('updateShowroomAsync', async ({data}, { rejectWithValue }) => {
    try {
        const showrooms = await updateShowroom(data);
        return showrooms;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const removeShowroomByIdsAsync = createAsyncThunk('removeShowroomByIdsAsync', async (ids, { rejectWithValue }) => {
    try {
        const showrooms = await removeBannerByIds(ids);
        return showrooms;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createShowroomAsync = createAsyncThunk('createShowroomAsync', async (data, { rejectWithValue }) => {
    try {
        const showroom = await createShowroom(data);
        console.log(showroom);
        return showroom;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const ShowroomSlice = createSlice({
    name: 'showroom',
    initialState: {
        showrooms: {
            values: [],
            errors: null,
            loading: false,
        },
        showroomUpdate: {
            values: {},
            errors: null,
            loading: false,
        },
        showroomRemove: {
            errors: null,
            message: null,
            dataDeleted: null,
        },
        create: {
            errors: null,
            message: null,
            loading: false,
            status: null,
        },
    },
    reducers: {},
    extraReducers:(builder)=> {
       builder.addCase(getAllShowroomAsync.pending,(state,action)=>{
        state.showrooms.loading = true
       })
       builder.addCase(getAllShowroomAsync.fulfilled,(state,action)=>{
        state.showrooms.loading = false
        state.showrooms.values = action.payload.data
       })
       builder.addCase(getAllShowroomAsync.rejected,(state,action)=>{
        state.showrooms.errors = action.payload
       })

       builder.addCase(createShowroomAsync.pending,(state,action)=>{
        state.create.loading = true
       })
       builder.addCase(createShowroomAsync.fulfilled,(state,action)=>{
        state.create.loading = false
        state.create.values = action.payload.data
       })
       builder.addCase(createShowroomAsync.rejected,(state,action)=>{
        state.create.loading = false
        state.create.errors = action.payload
       })
    },
});

export default ShowroomSlice.reducer;
