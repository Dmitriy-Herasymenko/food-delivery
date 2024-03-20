import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";

@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  private connectedUsers: Map<string, Socket[]> = new Map();

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      const user = await this.userRepository.findByPk(userId);
      client.emit("messages", user);

      client.on("newMessage", (data) => {
        client.emit("newMessage", data);
      });
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(`Client disconnected: ${client.id}, User ID: ${userId}`);

    if (this.connectedUsers.has(userId)) {
      const userSockets = this.connectedUsers
        .get(userId)
        .filter((socket) => socket !== client);

      if (userSockets.length === 0) {
        this.connectedUsers.delete(userId);
      } else {
        this.connectedUsers.set(userId, userSockets);
      }
    }
  }
}
