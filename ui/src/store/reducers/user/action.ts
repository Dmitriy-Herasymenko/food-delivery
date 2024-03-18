import { createAsyncThunk } from '@reduxjs/toolkit';


export const setToken= createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('user/setNotification', async (token, thunkAPI) => {
  try {
    return token;
  } catch (error) {
    return thunkAPI.rejectWithValue('Помилка отримання даних');
  }
});
