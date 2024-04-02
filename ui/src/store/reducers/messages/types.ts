
export interface MessagesState {
    //    messages: Message[];
    messages: any;
    chatListMessages: any;
    unreadMessages: number | null | undefined,
    showNotification: boolean;
    notificationMessage: string;
    notificationUsername: string;
    notificationImage: string;
    chatUserId: string,
    userId: string;
  }
