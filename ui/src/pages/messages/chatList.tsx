import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MarkMessageAsRead, Users } from "../../shared/api";
import {
  SentMessagesDataRequestMarkAsRead,
  StateReducers,
  ChatList,
} from "./types";
import { ShowUsersIcon } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export const ChatListPage: React.FC = () => {
  const { chatListMessages, userId } = useSelector(
    (state: StateReducers) => state.messagesReducer
  );
  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const { t } = useTranslation();

  const markMessageAsRead = async (
    userId: string,
    messageId: string
  ): Promise<void> => {
    const data: SentMessagesDataRequestMarkAsRead = {
      userId,
      messageId,
    };

    try {
      await MarkMessageAsRead(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllUsers = async () => {
    const response = await Users();
    setUsers(response?.data);
  };

  return (
    <div className={styles.containerChatList}>
      <div className="flex justify-between">
        <h1 className={styles.chatTitle}>{t("messages.chatTitle")}</h1>
        <div
          className="cursor-pointer"
          onClick={async () => {
            await getAllUsers();
            await setShowUserList(!showUserList);
          }}
        >
          <ShowUsersIcon />
        </div>
      </div>

      {showUserList && (
        <div
          className="fixed inset-0 z-50  flex items-center justify-center bg-gray-900 bg-opacity-50"
          onClick={() => setShowUserList(false)}
        >
          <div
            className="bg-[#333f55] border-[1px] border-[#333f55] shadow-lg p-8 rounded shadow-lg w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {users
                ?.filter((user) => user.id !== userId)
                .map((user) => {
                  return (
                    <li className="flex p-4 justify-between">
                      <div className="flex">
                        <img
                          src={
                            user.profileImage
                              ? user.profileImage
                              : `https://via.placeholder.com/50?text=${user?.userName[0]}`
                          }
                          alt=""
                          className="h-10inline-block h-8 w-8 rounded-full ring-2 ml-2.5 ring-white"
                        />
                        <span className="ml-4 ">{user.userName}</span>
                      </div>
                      <Link to={`/messages/${user.id}`}>
                        <button className="bg-blue-500 text-[12px] text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          messages
                        </button>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      <ul className={styles.messageList}>
        {chatListMessages.map((chat: ChatList, index: number) => {
          return (
            <li
              key={index}
              className={
                styles.messageItem && !chat.unread
                  ? styles.messageIsUnread
                  : styles.messageItem
              }
            >
              <Link
                to={`/messages/${chat.userId}`}
                className="flex"
                onClick={() => {
                  localStorage.setItem("chatUserId", chat.userId);
                  markMessageAsRead(userId, chat.userId);
                }}
              >
                <img
                  className={styles.messageImg}
                  src={chat.avatarUrl}
                  alt="Avatar"
                />
                <div className={styles.messageInfo}>
                  <span className={styles.infoUsername}>{chat.username}</span>
                  <span className={styles.infoLastMessage}>
                    {chat.lastMessage}
                  </span>
                </div>
              </Link>
              <div className="bg-[#5d87ff] rounded-md h-7 w-7 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-message-2"
                  width="22"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3"></path>
                  <line x1="8" y1="9" x2="16" y2="9"></line>
                  <line x1="8" y1="13" x2="14" y2="13"></line>
                </svg>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
