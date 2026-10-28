import { io, Socket } from 'socket.io-client';
import { type ISocketOn, type ISocketOff, type ISocketEmit, type IWebSocketClient, CONSTANTS_CONFIG, } from '../';

const url = CONSTANTS_CONFIG.SERVER_URL;

export class WebSocketClient implements IWebSocketClient {
    private socket: Socket;

    constructor(url: string) {
        this.socket = io(url, {
            autoConnect: false,
            transports: ['websocket'],
        });
    }

    connect() {
        if (!this.socket.connected) this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }

    on<T>(dto: ISocketOn<T>) {
        this.socket.on(dto.event, dto.handler);
    }

    off<T>(dto: ISocketOff<T>) {
        this.socket.off(dto.event, dto.handler);
    }

    emit<T>(dto: ISocketEmit<T>) {
        this.socket.emit(dto.event, dto.data);
    }

    get isConnected(): boolean {
        return this.socket.connected;
    }
}

export const wsClient = new WebSocketClient(url);