import { Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { Servis } from 'src/service/servis.service';
@Injectable()
export class EventsService {
  constructor(private service: Servis) {}
  findAll(data: any, client: Socket): Observable<WsResponse<number>> {
    return data;
  }

  onConnect(client: Socket) {}
  onDisconnect(client: Socket) {
    const isClientExist = this.service.user.find((e) => e === client.id);

    if (isClientExist) {
      const index = this.service.user.indexOf(client.id);
      this.service.user.splice(index, 1);
    }
  }
  onInit(server: Server) {}
  eventConnected(client: Socket) {
    const isClientExist = this.service.user.find((e) => e === client.id);
    if (!isClientExist) {
      this.service.user.push(client.id);
    }
  }
}
