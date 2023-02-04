import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrders, getOrderById, createOrder, updateOrder, getUserOrder } from '../api/order';

export const getOrdersAsync = createAsyncThunk('getOrdersAsync', async (filter, { rejectWithValue }) => {
    try {
        const order = await getOrders(filter);
        return order;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getOrderByIdAsync = createAsyncThunk('getOrderById', async (_id, { rejectWithValue }) => {
    try {
        const order = await getOrderById(_id);
        return order;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createOrderAsync = createAsyncThunk('createOrder', async (data, { rejectWithValue }) => {
    try {
        const order = await createOrder(data);
        return order;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateOrderAsync = createAsyncThunk('updateOrder', async ({ _id, data }, { rejectWithValue }) => {
    try {
        const order = await updateOrder(_id, data);
        return order;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: {
            values: [],
            errors: null,
            loading: false,
        },
    },
    reducers: {},
    extraReducers: {
        [getOrdersAsync.rejected.type]: (state, action) => {
            state.orders.loading = false;
        },
        [getOrdersAsync.pending.type]: (state, action) => {
            state.orders.loading = true;
        },
        [getOrdersAsync.fulfilled.type]: (state, action) => {
            state.orders.loading = false;
            state.orders.values = action.payload.data;
        },
        [createOrderAsync.fulfilled.type]: (state, action) => {
            state.orders.values.push(action.payload.data);
        },
        [updateOrderAsync.fulfilled.type]: (state, action) => {
            state.orders.values = state.orders.values.map((order) => {
                if (order._id !== action.payload.data._id) return order;
                return action.payload.data;
            });
        },
    },
});

export default OrderSlice.reducer;
