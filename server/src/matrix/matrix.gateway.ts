import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatrixService } from './matrix.service';
import { AnimateDTO, MatrixAnimate } from './matrix.animate';

export interface MatrixUpdateDto {
    matrix: number[];
}

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class MatrixGateway {
    constructor(private matrixService: MatrixService,
    private animate: MatrixAnimate) {}
    @WebSocketServer()
    server!: Server;
    @SubscribeMessage('matrix:update')
    async handleMatrixUpdate(@MessageBody() data: MatrixUpdateDto) {
        this.server.emit('matrix:update', data);
        this.matrixService.save(data.matrix)
    }

    @SubscribeMessage('matrix:get')
    async handleMatrixGet(@ConnectedSocket() client: Socket ) {
        const matrix = await this.matrixService.get()
        client.emit('matrix:update', {matrix:matrix??Array(256).fill(0x000000)})
    }

    @SubscribeMessage('preset:animate')
        async handleAnimate(@MessageBody() data: AnimateDTO|null) {
            if (!data) return
        await this.animate.animate({ from: data.from, to: data.to, step: data.step });
}
}