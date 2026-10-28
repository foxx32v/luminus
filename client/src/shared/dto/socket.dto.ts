export type SocketHandler<T> = (data: T) => void;
export type SocketEvent = string;

export interface ISocketOn<T> {
    event: SocketEvent;
    handler: SocketHandler<T>;
}

export interface ISocketOff<T> {
    event: SocketEvent;
    handler?: SocketHandler<T>;
}

export interface ISocketEmit<T> {
    event: SocketEvent;
    data: T;
}

export interface IWebSocketClient {
    connect: () => void;
    disconnect: () => void;
    on: <T>(dto: ISocketOn<T>) => void;
    off: <T>(dto: ISocketOff<T>) => void;
    emit: <T>(dto: ISocketEmit<T>) => void;
    readonly isConnected: boolean;
}

export type SocketHookStatusType = 'connection' | 'error' | 'connected' | 'disconnected' | null;