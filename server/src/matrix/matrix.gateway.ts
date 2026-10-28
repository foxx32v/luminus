import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, } from '@nestjs/websockets';
import { Server } from 'socket.io';

export interface MatrixUpdateDto {
    matrix: number[];
}

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class MatrixGateway {
    @WebSocketServer()
    server!: Server;
    @SubscribeMessage('matrix:update')
    handleMatrixUpdate(@MessageBody() data: MatrixUpdateDto) {
        this.server.emit('matrix:update', data);
    }
}