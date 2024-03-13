import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "./action";
import { userState } from "./types";

const initialState: userState = {
    isLoading: false,
    error: null,
    users: []
};

const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.users = [];
        }),
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload;
        }),
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.users = [];
        })
      
      }
});

export default usersReducer.reducer;
