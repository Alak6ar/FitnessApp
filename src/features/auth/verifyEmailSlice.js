import {createSlice} from '@reduxjs/toolkit';

const verifyEmailSlice = createSlice({
    name: "verifyEmail",
    initialState: {
        email: null
    },

    reducers:{
        setVerifyEmail : (state, action) => {
            state.email = action.payload
        }
    }
})

export const {setVerifyEmail} = verifyEmailSlice.actions
export default verifyEmailSlice.reducer;