import React, { useState, ChangeEvent } from "react";
import { SentMessage } from "../../shared/api";
import { useTranslation } from "react-i18next";
import { Messages, SentMessagesDataRequest, StateReducers } from "./types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styles } from "./styles";

export const MessagesPage: React.FC = () => {
  const { messages, userId } = useSelector(
    (state: StateReducers) => state.messagesReducer
  );
  const { id } = useParams();
  const [newMessages, setNewMessages] = useState<string>("");
  const { t } = useTranslation();

  const handleSentMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: SentMessagesDataRequest = {
      receiverId: id,
      senderId: userId,
      content: newMessages,
    };

    try {
      await SentMessage(data);
      setNewMessages("");
    } catch (error) {
      console.error("Error creating voting:", error);
    }
  };

  const chatUsername = messages?.filter((user) => user.userId === id);
  console.log("id", id);
  console.log("chatUsername", chatUsername);
  return (
    <div className={styles.container}>
      <div className={styles.wrapperUsername}>
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ml-2.5 ring-white"
          src={
            chatUsername[0]?.profileImage
              ? chatUsername[0]?.profileImage
              : `https://via.placeholder.com/50?text=${chatUsername[0]?.username[0]}`
          }
          alt=""
        />
        <h2 className={styles.title}>{chatUsername?.username}</h2>
      </div>
      <div className={styles.wrapper}>
        {messages?.map((message: Messages, index: number) => (
          <div
            key={index}
            className={message.userId === userId ? styles.wrapperMessage : ""}
          >
            <div
              key={index}
              className={
                message.userId === userId
                  ? styles.nestedWrapperCurrentUser
                  : styles.nestedWrapper
              }
            >
              <span className={styles.text}>{message?.text}</span>
            </div>
          </div>
        ))}
      </div>

      <form
        className="border-[1px] border-[#333f55] flex items-center p-8"
        onSubmit={handleSentMessage}
      >
        <textarea
          placeholder={t("messages.textArea")}
          value={newMessages}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setNewMessages(event.target.value)
          }
          className={styles.textArea}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-send"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="10" y1="14" x2="21" y2="3"></line>
            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};
