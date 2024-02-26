import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from './users.service';
import { User } from "./users.model";

@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    @InjectModel(User) private userRepository: typeof User, 
  ) {}
  private connectedUsers: Map<string, Socket[]> = new Map();
  
  private messageHistory: Map<string, { message: any; unreadCount: number }[]> = new Map();

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    const messages = await this.userRepository.findByPk(userId);
  
    client.emit('newMessage', messages.sentMessages);
  
    if (!this.connectedUsers.has(userId)) {
      this.connectedUsers.set(userId, [client]);
    } else {
      this.connectedUsers.get(userId).push(client);
    }
    console.log("messageHistory",   this.messageHistory.get(userId))
  }
  

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(`Client disconnected: ${client.id}, User ID: ${userId}`);

    if (this.connectedUsers.has(userId)) {
      const userSockets = this.connectedUsers.get(userId).filter((socket) => socket !== client);

      if (userSockets.length === 0) {
        this.connectedUsers.delete(userId);
      } else {
        this.connectedUsers.set(userId, userSockets);
      }
    }
  }

  @SubscribeMessage('newMessage')
  async handleMessage(
    @MessageBody() data: { message: any; unreadCount: number },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;

    const messages = await this.userRepository.findByPk(userId);
  console.log("data", data)
    client.emit('newMessage', messages.sentMessages);
    // Обновляем список непрочитанных сообщений для пользователя
    // const unreadMessages = await this.usersService.getMessageHistory(userId);
    
    // // Зберігаем новое сообщение в истории
    // if (!this.messageHistory.has(userId)) {
    //   this.messageHistory.set(userId, unreadMessages);
    // } else {
    //   const history = this.messageHistory.get(userId);
    //   history.push(data);
    //   this.messageHistory.set(userId, history);
    // }
  
    // // Отправляем обновленный список непрочитанных сообщений пользователю
    // client.emit('unreadMessages', unreadMessages);
  }
  
  
  
}
