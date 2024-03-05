import React, { useState, useEffect } from "react";
import { SentMessage } from "../../shared/api"
import io from "socket.io-client";

interface Message {
  message: string;
  username: string;
}

interface SentMessagesDataRequest {
  senderId: string,
  receiverId: string,
  content: string
}

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [newMessages, setNewMessages] = useState<string>("");

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: "69797a4c-f0aa-4859-985a-3309da6f159e" },
    });

    socket.on("connect", () => {
      console.log(`Connected to WebSocket server`);
    });

    socket.on("messages", (data: any) => {
      console.log("data", data)
      const { receivedMessages = [], sentMessages, unreadMessages } = data;
      const combinedArrayMessages: Message[] = [...receivedMessages, ...sentMessages].sort(
        (a: Message, b: Message) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setUserName(sentMessages[0].username);
      setMessages(prevMessages => [...prevMessages, ...combinedArrayMessages]);
      localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages?.length));
      console.log("messages", messages);
    });

    socket.on("newMessage", (data: Message) => {
      console.log("Received new message:", data);
      setMessages(prevMessages => [...prevMessages, data]);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSentMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: SentMessagesDataRequest = {
      receiverId: "ea310f42-86d9-41e6-b766-8c412b5a712f",
      senderId: "69797a4c-f0aa-4859-985a-3309da6f159e",
      content: newMessages
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
          <div key={index} className={message.username === userName ? `flex justify-end` : ''}>
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

      <form className="mt-10 flex justify-center flex-col w-2/4 m-auto"
      onSubmit={handleSentMessage}
      >
        <textarea
          type="text"
          placeholder="Введіть повідомлення..."
          value={newMessages}
          onChange={ event => setNewMessages(event.target.value) }
          
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 bg-gray-100  text-left"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
        >
          Відправити
        </button>
      </form>
    </div>
  );
};
