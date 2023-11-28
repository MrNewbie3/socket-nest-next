import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { Servis } from 'src/service/servis.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    private eventService: EventsService,
    private service: Servis,
  ) {}
  afterInit(server: Server) {
    this.eventService.onInit(server);
  }
  handleConnection(client: Socket) {
    this.eventService.onConnect(client);
  }
  handleDisconnect(client: Socket) {
    this.eventService.onDisconnect(client);
    this.server.emit('connectedUser', { data: this.service.user });
  }

  @SubscribeMessage('event')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // this.server.emit('active', { client: client.id });
    console.log('event clicked by user: ' + client.id);
    console.log(this.service.user);

    // return this.eventService.findAll(data, client);
  }
  @SubscribeMessage('register')
  async registerUser(
    @MessageBody() data: number,
    @ConnectedSocket() client: Socket,
  ) {
    this.eventService.eventConnected(client);
    this.server.emit('connectedUser', { data: this.service.user });
  }

  @SubscribeMessage('start')
  async identity(@MessageBody() data: number) {
    this.server.emit('start');
  }
}
