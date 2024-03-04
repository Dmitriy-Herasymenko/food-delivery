import React, { useState, useEffect } from "react";
import io from "socket.io-client";

interface Message {
  message: string;
  username: string;
}

export const MessagesPage: React.FC = () => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: "69797a4c-f0aa-4859-985a-3309da6f159e" },
    });

    socket.on("connect", () => {
      console.log(`Connected to WebSocket server`);
    });

    socket.on("newMessage", (data: Message) => {
      console.log("Received new message:", data);
      setNewMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("unreadMessages", (data: Message) => {
      console.log("Received unread message:", data);
      setUnreadMessages((prevMessages) => [...prevMessages, data]);
      localStorage.setItem("unreadMessages", JSON.stringify(data?.length));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="overflow-auto h-80 shadow-md p-10 ">
        <h2 className="text-lg font-semibold mb-2">Нові повідомлення</h2>
        {newMessages[0]?.map((message, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md mb-2 p-5 w-3/4 border-[#000]"
          >
            <span className="font-semibold">{message.username}: </span>
            <span>{message.text}</span>
          </div>
        ))}

        {unreadMessages[0]?.map((message, index) => (
          <div className="flex justify-end">
            <div
              key={index}
              className="bottom-0 bg-gray-100 rounded-md mb-2 p-5 w-3/4 border-[#000]"
            >
              <span className="font-semibold">{message.username}: </span>
              <span>{message.text}</span>
            </div>
          </div>
        ))}
      </div>

      <form className="mt-10 flex justify-center flex-col w-2/4 m-auto">
        <textarea
          type="text"
          placeholder="Введіть повідомлення..."
          // value={inputText}
          // onChange={handleChange}
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
