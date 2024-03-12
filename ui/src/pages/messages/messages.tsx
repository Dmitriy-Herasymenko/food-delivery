import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { SentMessage } from "../../shared/api";
import { Notification } from "../../components";
import io from "socket.io-client";

interface Message {
  message: string;
  username: string;
  createdAt: string; 
  text: string;
}

interface SentMessagesDataRequest {
  senderId: string;
  receiverId: string;
  content: string;
}

const CURREN_USER_ID = "69797a4c-f0aa-4859-985a-3309da6f159e"

export const MessagesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [newMessages, setNewMessages] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationUsername, setNotificationUsername] = useState<string>("");

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: CURREN_USER_ID },
    });

    socket.on("connect", () => {
      console.log(`Connected to WebSocket server`);
    });

    socket.on("messages", (data: any) => {
      const { receivedMessages = [], sentMessages, unreadMessages } = data;
      const combinedArrayMessages: Message[] = [
        ...receivedMessages,
        ...sentMessages,
      ].sort(
        (a: Message, b: Message) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ).filter(
        (message) => message?.userId === id
      );


      setUserName(sentMessages[0]?.username);
      setMessages((prevMessages) => [
        ...prevMessages,
        ...combinedArrayMessages,
      ]);
      localStorage.setItem(
        "unreadMessages",
        JSON.stringify(unreadMessages?.length)
      );
    });

    socket.on("newMessage", (data: Message) => {
      const filteredMessages = messages.filter(message => message.userId === id);
      console.log("filteredMessages 2", filteredMessages)
      setMessages(() => [...filteredMessages, data]);
      setNotificationMessage(data?.text);
      setNotificationUsername(data?.username);
      setShowNotification(userName !== data.username);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [userName]);

  const handleSentMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data: SentMessagesDataRequest = {
      receiverId: "ea310f42-86d9-41e6-b766-8c412b5a712f",
      senderId: "69797a4c-f0aa-4859-985a-3309da6f159e",
      content: newMessages,
    };

    try {
      await SentMessage(data);
      setNewMessages("");
    } catch (error) {
      console.error("Error creating voting:", error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="overflow-auto h-80 shadow-md p-10 ">
        <h2 className="text-lg font-semibold mb-2">Нові повідомлення</h2>
        {messages?.map((message, index) => (
          <div
            key={index}
            className={message.username === userName ? `flex justify-end` : ""}
          >
            <div
              key={index}
              className="bg-gray-100 rounded-md mb-2 p-5 w-3/4 border-[#000]"
            >
              <span className="font-semibold">{message.username}: </span>
              <span>{message?.text}</span>
            </div>
          </div>
        ))}
      </div>

      <form
        className="mt-10 flex justify-center flex-col w-2/4 m-auto"
        onSubmit={handleSentMessage}
      >
        <textarea
          placeholder="Введіть повідомлення..."
          value={newMessages}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNewMessages(event.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 bg-gray-100  text-left"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
        >
          Відправити
        </button>
      </form>
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
