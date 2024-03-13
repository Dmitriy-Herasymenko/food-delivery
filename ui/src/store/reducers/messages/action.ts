import { createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";

const USER_ID = "69797a4c-f0aa-4859-985a-3309da6f159e";

export const messagesAction = createAsyncThunk<any, void, { rejectValue: string }>(
  "messages/subscribeToWebSocket",
  async (_, { rejectWithValue }) => {
    return new Promise<any>((resolve, reject) => {
      const socket = io("ws://localhost:5000", {
        query: { userId: USER_ID },
      });

      socket.on("connect", () => {
        console.log("WebSocket connected");
      });

      // Постійно слідкуємо за новими повідомленнями
      socket.on("messages", (data: any) => {
        // Обробка отриманих повідомлень
        const newChatList = data?.receivedMessages?.reduce(
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
        resolve(newChatList);
      });


      socket.on("error", (error: any) => {
        rejectWithValue(error);
      });
    });
  }
);

export const notificationAction = createAsyncThunk<any, any, { rejectValue: string}> (
  "messages/newMessages",
  async (data, thunkAPI) => {
    try {
      return { showNotification: true, notificationMessage: data.text, notificationUsername: data.username };
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка отримання даних");
    }
  }
)

export const setNotification = createAsyncThunk<any, any, { rejectValue: string}> (
  "messages/setNotification",
  async (isOpen, thunkAPI) => {
    try {
      return isOpen;
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка отримання даних");
    }
  }
)


export const unsubscribeFromWebSocket = (socket: any) => {
  socket.disconnect();
};
