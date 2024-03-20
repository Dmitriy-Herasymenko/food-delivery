import { createSlice } from '@reduxjs/toolkit';
import { setToken } from './action';
 import { MessagesState } from './types';


const initialState: any = {
  token: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setToken.pending, (state) => {
      state.token = null;

    }),
      builder.addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      }),
      builder.addCase(setToken.rejected, (state) => {
        state.token = null;
      })
    }
});

export default userReducer.reducer;
