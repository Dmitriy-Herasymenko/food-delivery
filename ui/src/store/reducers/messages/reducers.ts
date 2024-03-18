import { createSlice } from '@reduxjs/toolkit';
import { messagesAction, notificationAction, setNotification } from './action';
 import { MessagesState } from './types';


const initialState: MessagesState = {
  messages: [],
  chatListMessages: [],
  showNotification: false,
  unreadMessages: null,
  notificationMessage: '',
  notificationUsername: '',
  userId: '',
  chatUserId: '',
};

const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(messagesAction.pending, (state) => {
      state.chatListMessages = [];
      state.messages = [];
      state.unreadMessages = null;
      state.showNotification = false;

    }),
      builder.addCase(messagesAction.fulfilled, (state, action) => {
        state.chatListMessages = action.payload.chatList;
        state.messages = action.payload.messages;
        state.unreadMessages = action.payload.unreadMessages;
        state.userId = action.payload.userId;
      }),
      builder.addCase(messagesAction.rejected, (state) => {
        state.chatListMessages = [];
        state.messages = [];
        state.unreadMessages = null;
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
