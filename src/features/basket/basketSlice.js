import {
    createSlice
} from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basketStorage: [],
        cost: ""
    },

    

    reducers: {
        addBasket: (state, action) => {
            
            const payload = action.payload;
            const bs = state.basketStorage;
            console.log(action.payload);
            
            const addFind = bs.find(item => item.id === payload.id);

            if (addFind) {
                addFind.amount += 1;
            }
            else {
                const newData = [...bs, payload]
                console.log(newData);
                state.basketStorage = newData
                console.log(...bs);
            }
            console.log(state.basketStorage);
        },

        removeBasket: (state, action) => {
            const py = action.payload;
            const removeFind = state.basketStorage.find(item => item.id === py.id);
            removeFind.amount -= 1;
            if (removeFind.amount === 0) {
                const c = [...state.basketStorage.filter(item => item.id !== py.id)]
                state.basketStorage = c
            } else {
                const newData = [...state.basketStorage.filter(item => item.id !== py.id), 
                    {
                        id: py.id,
                        name: py.name,
                        description: py.description,
                        price: py.price,
                        discount: py.discount,
                        discountPrice: py.discountPrice,
                        imageUrl: py.imageUrl,
                        amount: removeFind.amount
                    }
                ]
                state.basketStorage = newData
            }
            console.log(state.basketStorage);
            
        },

        removeItemBasket : (state, action) => {
            const py = action.payload;
            const c = [...state.basketStorage.filter(item => item.id !== py.id)]
            state.basketStorage = c
        },

        clearBasket: (state) => {
            state.basketStorage = []
        }


    },
});

export const {
    addBasket,
    removeBasket,
    clearBasket,
    removeItemBasket
} = basketSlice.actions;
export default basketSlice.reducer;
export const selectBasket = (state) => state.basket.basketStorage;