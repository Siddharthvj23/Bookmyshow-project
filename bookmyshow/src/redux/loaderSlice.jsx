import { createSlice } from "@reduxjs/toolkit";


const loaderslice = createSlice({
    name:'loader',
    initialState:{
        loading:false
    },

    reducers :{
        showloading :(state) =>{
            state.loading = true
        },
        hideloading :(state) =>{
            state.loading = false
        }

    }
})

export const {showloading,hideloading} = loaderslice.actions;
export default loaderslice.reducer