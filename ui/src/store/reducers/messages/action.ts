import { createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const USER_ID = localStorage.getItem('userId');

export const messagesAction = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('messages/subscribeToWebSocket', async (_, thunkAPI) => {
  return new Promise<any>((resolve, reject) => {
    const socket = io('ws://localhost:5000', {
      query: { userId: USER_ID },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('messages', (data: any) => {
      if (data && data.receivedMessages) {
        const { receivedMessages = [], sentMessages, unreadMessages } = data;
        const chatUserId = localStorage.getItem('chatUserId');
        const userId = data?.id;

        const newChatList = receivedMessages?.reduce(
          (acc: any, message: any) => {
            const existingChatIndex = acc.findIndex(
              (chat: any) => chat.userId === message.userId
            );
            if (existingChatIndex !== -1) {
              acc[existingChatIndex] = {
                ...acc[existingChatIndex],
                lastMessage: message.text,
              };
            } else {
              const unread =
                data?.unreadMessages?.length === 0 ||
                !data.unreadMessages.some(
                  (msg: any) => msg.userId === message.userId
                );

              acc.push({
                username: message.username,
                lastMessage: message.text,
                userId: message.userId,
                avatarUrl: `https://via.placeholder.com/50?text=${message.username[0]}`,
                unread: unread,
              });
            }

            return acc;
          },
          []
        );

        const combinedArrayMessages: any[] = [
          ...receivedMessages,
          ...sentMessages,
        ]
          .sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .filter(
            (message) =>
              message?.userId === chatUserId || message?.userId === userId
          );
        resolve({
          chatList: newChatList,
          messages: combinedArrayMessages,
          unreadMessages: unreadMessages.length,
          userId: data?.id,
        });
      }
    });

    socket.on('error', (error: any) => {
      rejectWithValue(error);
    });
  });
});

export const notificationAction = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('messages/newMessages', async (data, thunkAPI) => {
  try {
    return {
      showNotification: true,
      notificationMessage: data.text,
      notificationUsername: data.username,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue('Помилка отримання даних');
  }
});

export const setNotification = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('messages/setNotification', async (isOpen, thunkAPI) => {
  try {
    return isOpen;
  } catch (error) {
    return thunkAPI.rejectWithValue('Помилка отримання даних');
  }
});

export const unsubscribeFromWebSocket = (socket: any) => {
  socket.disconnect();
};
