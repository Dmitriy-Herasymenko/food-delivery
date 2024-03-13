import { createSlice } from "@reduxjs/toolkit";
import { messagesAction, notificationAction, setNotification } from "./action";
// import { Message } from "./types";

interface ChatState {
  //    messages: Message[];
  messages: any;
  chatListMessages: any;
  showNotification: boolean;
  notificationMessage: string;
  notificationUsername: string;
}

const initialState: ChatState = {
  messages: [],
  chatListMessages: [],
  showNotification: false,
  notificationMessage: "",
  notificationUsername: "",
};

const messagesReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(messagesAction.pending, (state) => {
      state.chatListMessages = [];
      state.showNotification = false;
    }),
      builder.addCase(messagesAction.fulfilled, (state, action) => {
        state.chatListMessages = action.payload;
      }),
      builder.addCase(messagesAction.rejected, (state, action) => {
        state.chatListMessages = [];
        state.showNotification = false;
      }),
      builder.addCase(notificationAction.fulfilled, (state, action) => {
        state.showNotification = action.payload.showNotification;
        state.notificationMessage = action.payload.notificationMessage;
        state.notificationUsername = action.payload.notificationUsername;
      }),
      builder.addCase(setNotification.fulfilled, (state, action) => {
        state.showNotification = action.payload;
      })
  },
});

export default messagesReducer.reducer;
