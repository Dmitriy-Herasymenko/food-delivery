import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetUser } from '../../../shared/api'

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

export const getUser = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('user/getUser', async (id, thunkAPI) => {
  try {
    const { data } = await GetUser(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Помилка отримання даних');
  }
});