import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,  // JSON.parse() GEREKSİZ
    },

    reducers: {
        setToken: (state, action) => {
            state.token = action.payload; 
            localStorage.setItem("token", action.payload); // JSON.stringify() GEREKSİZ
        },

        logOut: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
