import React, { useState, ChangeEvent } from 'react';
import { SentMessage } from '../../shared/api';
import { useTranslation } from 'react-i18next';
import { Messages, SentMessagesDataRequest, StateReducers } from './types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styles } from './styles';

export const MessagesPage: React.FC = () => {
  const { messages, userId } = useSelector(
    (state: StateReducers) => state.messagesReducer
  );
  const { id } = useParams();
  const [newMessages, setNewMessages] = useState<string>('');
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
      setNewMessages('');
    } catch (error) {
      console.error('Error creating voting:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('messages.title')}</h2>
        {messages?.map((message: Messages, index: number) => (
          <div
            key={index}
            className={message.userId === userId ? styles.wrapperMessage : ''}
          >
            <div
              key={index}
              className={styles.nestedWrapper}
            >
              <span className={styles.userName}>{message.username}: </span>
              <span>{message?.text}</span>
            </div>
          </div>
        ))}
      </div>

      <form
        className={styles.wrapperForm}
        onSubmit={handleSentMessage}
      >
        <textarea
          placeholder={t('messages.textArea')}
          value={newMessages}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setNewMessages(event.target.value)
          }
          className={styles.textArea}
        />
        <button
          type='submit'
          className={styles.submitBtn}
        >
          {t('messages.btnSubmit')}
        </button>
      </form>
    </div>
  );
};
