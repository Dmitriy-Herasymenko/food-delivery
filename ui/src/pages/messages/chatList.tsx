import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Notification } from "../../components";
import { MarkMessageAsRead } from "../../shared/api";
import io from "socket.io-client";

interface Message {
  text: string;
  userId: string;
  username: string;
}

interface Chat {
  username: string;
  lastMessage: string;
  userId: string;
  avatarUrl: string;
  unread: boolean;
}

interface SentMessagesDataRequest {
  userId: string;
  messageId: string;
}

const USER_ID = "69797a4c-f0aa-4859-985a-3309da6f159e";

export const ChatListPage: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationUsername, setNotificationUsername] = useState<string>("");

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: USER_ID },
    });

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("messages", (data: any) => {
      setChatList(() => {
        const newChatList = data?.receivedMessages?.reduce(
          (acc: Chat[], message: Message) => {
            const existingChatIndex = acc.findIndex(
              (chat) => chat.userId === message.userId
            );
            if (existingChatIndex !== -1) {
              acc[existingChatIndex] = {
                ...acc[existingChatIndex],
                lastMessage: message.text,
              };
            } else {
              const unread =
  data?.unreadMessages?.length === 0 ||
  !data.unreadMessages.some((msg: any) => msg.userId === message.userId);

                   
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
        return newChatList;
      });
    });

    socket.on("newMessage", (data: Message) => {
      setChatList((prevChatList) =>
        prevChatList.map((chat) => ({
          ...chat,
          lastMessage:
            chat.userId === data.userId ? data.text : chat.lastMessage,
          unread: chat.userId === data.userId,
        }))
      );
      setNotificationMessage(data.text);
      setNotificationUsername(data.username);
      setShowNotification(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function markMessageAsRead(
    userId: string,
    messageId: string
  ): Promise<void> {
    const data: SentMessagesDataRequest = {
      userId,
      messageId,
    };

    try {
      await MarkMessageAsRead(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Список чатов</h1>
      <ul className="divide-y divide-gray-200">
        {chatList.map((chat: Chat, index: number) => {
          console.log("chat", chat);
          return (
            <li
              key={index}
              className={`py-4 mt-10 flex ${
                !chat.unread ? "bg-blue-100 rounded-lg" : ""
              }`}
            >
              <Link
                to={`/messages/${chat.userId}`}
                className="flex"
                onClick={() => markMessageAsRead(USER_ID, chat.userId)}
              >
                <img
                  className="w-10 h-10 ml-5 rounded-full mr-4"
                  src={chat.avatarUrl}
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{chat.username}</span>
                  <span className="text-sm text-gray-500">
                    {chat.lastMessage}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {showNotification && (
        <Notification
          username={notificationUsername}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};
