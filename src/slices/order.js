import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    getOrders,
    getOrderById,
    createOrder,
    removeOrder,
    updateOrder,
    removeOrderByIds,
} from '../api/order';

export const getOrdersAsync = createAsyncThunk('getOrdersAsync', async (filter, {
    rejectWithValue
}) => {
    try {
        const order = await getOrders(filter)
        return order
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const getOrderByIdAsync = createAsyncThunk('getOrderById', async (_id, {
    rejectWithValue
}) => {
    try {
        const order = await getOrderById(_id);
        return order
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const createOrderAsync = createAsyncThunk('createOrder', async (data, {
    rejectWithValue
}) => {
    try {
        const order = await createOrder(data)
        return order
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const removeOrderAsync = createAsyncThunk('removeOrder', async (_id, {
    rejectWithValue
}) => {
    try {
        const order = await removeOrder(_id)
        return order
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const removeOrderByIdsAsync = createAsyncThunk('removeOrderByIdsAsync', async (ids, {
    rejectWithValue
}) => {
    try {
        const orders = await removeOrderByIds(ids);
        return orders
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateOrderAsync = createAsyncThunk('updateOrder', async ({
    _id,
    data
}, {
    rejectWithValue
}) => {
    try {
        const order = await updateOrder(_id, data)
        return order
    } catch (error) {
        return rejectWithValue(error)
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
        create: {
            errors: null,
            message: null,
            loadding: false,
            status: null,
        },
        ordersRemove: {
            errors: null,
            message: null,
            dataDeleted: null,
        },
        ordersUpdate: {
            values: {},
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
            state.orders.values = action.payload.data
        },
        [createOrderAsync.fulfilled.type]: (state, action) => {
            state.orders.values.push(action.payload.data);
        },
        [removeOrderByIdsAsync.fulfilled.type]: (state, action) => {
            console.log(action.payload);
            if (action.payload.data.dataDeleted) {
                state.ordersRemove.dataDeleted = action.payload.data.dataDeleted;
            }
            state.orders.values = state.orders.values.filter((order) => {
                return !action.payload.data.ids.includes(order._id);
            });
        },
        [updateOrderAsync.fulfilled.type]: (state, action) => {
            state.orders.values = state.orders.values.map((order) => {
                if (order._id !== action.payload.data._id) return order;
                return action.payload.data;
            });
        },
    }
})

export default OrderSlice.reducer;