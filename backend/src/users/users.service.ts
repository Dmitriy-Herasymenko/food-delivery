import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersGateway } from "./users.gateway"; 

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private usersGateway: UsersGateway,) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }
  
  async findOne(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
  async sendMessage(senderId: string, receiverId: string, content: string): Promise<User> {
  const sender = await this.userRepository.findByPk(senderId);

  if (!sender) {
    throw new NotFoundException(`User with ID ${senderId} not found`);
  }

  const receiver = await this.userRepository.findByPk(receiverId);

  if (!receiver) {
    throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
  }

  const message: any = {
    text: content,
    username: sender.userName,
};
  
  
  sender.sentMessages = sender.sentMessages || [];
  sender.sentMessages.push(message);


  receiver.receivedMessages = receiver.receivedMessages || [];
  receiver.receivedMessages.push(message);

  await this.userRepository.update({ sentMessages: sender.sentMessages }, { where: { id: senderId } });
  await this.userRepository.update({ receivedMessages: receiver.receivedMessages }, { where: { id: receiverId } });

  this.usersGateway.server.emit('newMessage', message);

  return sender;

}


  
}
