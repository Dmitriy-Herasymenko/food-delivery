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

    const user = await this.userRepository.findByPk(userId);
    client.emit('messages', user)
    client.emit('newMessage', user.sentMessages);
    client.emit('unreadMessages', user.unreadMessages);

    // if (!this.connectedUsers.has(userId)) {
    //   this.connectedUsers.set(userId, [client]);
    // } else {
    //   this.connectedUsers.get(userId).push(client);
    // }

    // client.on('unreadMessages', (data) => {
    //   console.log(`Received message from client ${client.id}: ${data}`);
    // });
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

  // @SubscribeMessage('unreadMessages')
  // async handleMessage(
  //   @MessageBody() data: any,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", data)
  // //   const userId = client.handshake.query.userId as string;

  // //   const user = await this.userRepository.findByPk(userId); 


  // //   const messagesWithUnreadCount = user.unreadMessages.map(message => {
  // //     return  {message: message,
  // //     unreadCount: user.unreadMessages.length} 
  // // });

  // //   if (!this.messageHistory.has(userId)) {
  // //     this.messageHistory.set(userId, messagesWithUnreadCount);
  // //   } else {
  // //     const history = this.messageHistory.get(userId);
  // //     history.push(data);
  // //     this.messageHistory.set(userId, history);
  // //   }
  
  // //   client.emit('unreadMessages', messagesWithUnreadCount);
  // }
}
