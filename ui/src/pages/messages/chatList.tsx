import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MarkMessageAsRead } from '../../shared/api';
import {
  SentMessagesDataRequestMarkAsRead,
  StateReducers,
  ChatList,
} from './types';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

export const ChatListPage: React.FC = () => {
  const { chatListMessages, userId } = useSelector(
    (state: StateReducers) => state.messagesReducer
  );
  const { t } = useTranslation();

  async function markMessageAsRead(
    userId: string,
    messageId: string
  ): Promise<void> {
    const data: SentMessagesDataRequestMarkAsRead = {
      userId,
      messageId,
    };

    try {
      await MarkMessageAsRead(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.containerChatList}>
      <h1 className={styles.chatTitle}>{t('messages.chatTitle')}</h1>
      <ul className={styles.messageList}>
        {chatListMessages.map((chat: ChatList, index: number) => {
          return (
            <li
              key={index}
              className={styles.messageItem && !chat.unread ? styles.messageIsUnread : ''}
            >
              <Link
                to={`/messages/${chat.userId}`}
                className='flex'
                onClick={() => {
                  localStorage.setItem('chatUserId', chat.userId);
                  markMessageAsRead(userId, chat.userId);
                }}
              >
                <img
                  className={styles.messageImg}
                  src={chat.avatarUrl}
                  alt='Avatar'
                />
                <div className={styles.messageInfo}>
                  <span className={styles.infoUsername}>{chat.username}</span>
                  <span className={styles.infoLastMessage}>
                    {chat.lastMessage}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
