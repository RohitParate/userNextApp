import { configureStore } from "@reduxjs/toolkit";
import userRducer from "./features/user/userSlice"

const store = configureStore({
    reducer : {
        user : userRducer
    }
})

export default store
export type AppDispatch = typeof store.dispatch