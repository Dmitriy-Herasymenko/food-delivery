import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersGateway } from "./users.gateway";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private usersGateway: UsersGateway
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findByPk(id);
    return user;
  }


  async getUnreadMessageCount(userId: string): Promise<number> {
    try {
      const user = await this.userRepository.findByPk(userId);
      if (user) {
        // Отримайте кількість непрочитаних повідомлень за вашою логікою
        const unreadCount = user.unreadMessages.length;
        return unreadCount;
      }
      return 0;
    } catch (error) {
      throw new Error(`Error getting unread message count: ${error.message}`);
    }
  }

  async getMessageHistory(userId: string): Promise<{ message: any; unreadCount: number }[]> {
    const user = await this.userRepository.findByPk(userId);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.sentMessages.map((sentMessage:any) => ({
      message: {
        text: sentMessage.text,
        username: sentMessage.username,
      },
      unreadCount: 0,
    }));
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }

  async findOne(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<void> {
    const sender = await this.findUserById(senderId);
    const receiver = await this.findUserById(receiverId);
  
    const message: any = {
      text: content,
      username: sender.userName,
      createdAt: Date.now()
    };
  
    sender.sentMessages = sender.sentMessages || [];
    sender.sentMessages.push(message);
  
    receiver.receivedMessages = receiver.receivedMessages || [];
    receiver.receivedMessages.push(message);
  
    await this.userRepository.update(
      { sentMessages: sender.sentMessages },
      { where: { id: senderId } }
    );
    await this.userRepository.update(
      { receivedMessages: receiver.receivedMessages },
      { where: { id: receiverId } }
    );
  
    // Отримуємо кількість непрочитаних повідомлень отримувача
    const unreadCount = receiver.unreadMessages ? receiver.unreadMessages.length + 1 : 1;

    // Якщо є непрочитані повідомлення, оновлюємо їх та відсилаємо через веб-сокет
    if (unreadCount > 0) {
      receiver.unreadMessages = receiver.unreadMessages || [];
      receiver.unreadMessages.push(message);
  
      await this.userRepository.update(
        { unreadMessages: receiver.unreadMessages },
        { where: { id: receiverId } }
      );
      
      // Відправляємо повідомлення та кількість непрочитаних повідомлень через веб-сокет
      this.usersGateway.server.to(receiverId).emit('newMessage', {
        message,
        unreadCount,
      });
      this.usersGateway.server.to(receiverId).emit('unreadMessages', receiver.unreadMessages)
    } else {
      // Якщо немає непрочитаних повідомлень, відсилаємо тільки нове повідомлення
      this.usersGateway.server.to(senderId).emit('newMessage', {
        message,
        unreadCount: 0,
      });
      this.usersGateway.server.to(senderId).emit('unreadMessages', receiver.unreadMessages)
    }
    // this.usersGateway.server.emit('messages', {receiverId, senderId})
    this.usersGateway.server.to(senderId).emit('messages', message)
    this.usersGateway.server.to(receiverId).emit('messages', message)

    this.usersGateway.server.emit('newMessage', message)

  }

async markMessagesAsRead(userId: string): Promise<void> {
  try {
    const user = await this.userRepository.findByPk(userId);
    if (user) {
      user.unreadMessages = [];
      await user.save();
    }
  } catch (error) {
    throw new Error(`Error marking messages as read: ${error.message}`);
  }
}

async getUnreadMessages(userId: string): Promise<any[]> {
  const user = await this.userRepository.findByPk(userId);
  
  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  // Вернуть непрочитанные сообщения пользователя
  return user.unreadMessages;
}

  

  private async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }
}
