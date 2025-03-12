import {
    createSlice
} from "@reduxjs/toolkit";

const totalAmountSlice = createSlice({
    name: "totalAmount",
    initialState: {
        cost: 0
    },

    reducers: {
        addCost: (state, action) => {
            state.cost = action.payload            
        },
    },
});

export const {
    addCost,
} = totalAmountSlice.actions;
export default totalAmountSlice.reducer;
export const selectTotalAmount = (state) => state.totalAmount.cost;