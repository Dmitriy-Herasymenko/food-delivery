import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "./types";
import axios, { AxiosError } from "axios";

export const getUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
