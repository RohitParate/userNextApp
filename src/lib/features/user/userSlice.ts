import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "../../../Axios/axiosInstance";

interface State {
    currentUser: {
        // Define the structure of currentUser if needed
    };
    error: SerializedError | null;
}

const initialState: State = {
    currentUser: {},
    error: null,
};

export const userLogin = createAsyncThunk("user/login", async (userCredentials : {userName : string, password : string}) => {
    debugger
    const response = await axios.post("/auth/login", userCredentials);
    sessionStorage.setItem('token', response.data.token);
    return response.data;
})

const userSlice = createSlice({ // createSlice will automatically create action creators with same name as reducer functions.
    name: 'user',
    initialState,
    reducers : {
        // loggedIn : (state, action) => {
        //     state.currentUser = action.payload; // uses immer library under the hood to update the state
        // },
        // loggedOut : (state, action) => {
        //     state.currentUser = {}
        // }
        clearError : (state) => {
            state.error = null
        },
        clearUser : (state) => {
            state.currentUser = {}
        },
        setUser : (state, action) => {
            state.currentUser = action.payload
        }
       
    },
    extraReducers: builder => {
        builder.addCase(userLogin.pending, (state) => {
            state.currentUser = {};
            state.error = null;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.error = null;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.currentUser = {};
            state.error = action.error
        })
    }

})

export default userSlice.reducer;

export const {
    // loggedIn, 
    // loggedOut,
    clearError,
    clearUser,
    setUser
} = userSlice.actions
