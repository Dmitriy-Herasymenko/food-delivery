interface ChatListMessages {
  avatarUrl: string;
  lastMessage: string;
  unread: boolean;
  userId: string;
  username: string;
}

export interface ChatList {
    username: string;
    lastMessage: string;
    userId: string;
    avatarUrl: string;
    unread: boolean;
  }

export interface Messages {
  createdAt: number;
  text: string;
  userId: string;
  username: string;
}
export interface SentMessagesDataRequest {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface SentMessagesDataRequestMarkAsRead {
    userId: string;
    messageId: string;
  }
  

interface MessagesReducer {
  chatListMessages: ChatListMessages[];
  chatUserId: string;
  messages: Messages[];
  notificationMessage: string;
  notificationUsername: string;
  showNotification: boolean;
  unreadMessages: number;
  userId: string;
}

export interface StateReducers {
  messagesReducer: MessagesReducer;
}
