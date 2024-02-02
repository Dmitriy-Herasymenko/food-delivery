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

  async sendMessage(
    senderId: string,
    receiverId: string,
    content: string
  ): Promise<User> {
    const sender = await this.findUserById(senderId);
    const receiver = await this.findUserById(receiverId);

    const message: any = {
      text: content,
      username: sender.userName,
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

    // Відправлення пуш-повідомлення через веб-сокет
    this.usersGateway.server.to(receiverId).emit("newMessage", {
      message,
      unreadCount: receiver.unreadMessages.length,
    });

    return sender;
  }

  private async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }
}
