import { useCallback, useEffect, useState } from 'react';
import { useSocketStore, wsClient, type SocketEvent, type SocketHandler, type SocketHookStatusType } from '../';

export function useSocket() {
    const {isConnection,error,status,setStatus,setError,setIsConnection} = useSocketStore()

    useEffect(() => {
        const onConnect: SocketHandler<undefined> = () => {
            setIsConnection(true);
            setStatus('connected');
        }
        const onDisconnect: SocketHandler<undefined> = () => {
            setIsConnection(false);
            setStatus('disconnected');
        }
        const onError: SocketHandler<unknown> = (err) => {
            setError(err);
            setStatus('error');
        }
        wsClient.on({ event: 'connect', handler: onConnect })
        wsClient.on({ event: 'disconnect', handler: onDisconnect })
        wsClient.on({ event: 'connect_error', handler: onError })
        return () => {
            wsClient.off({ event: 'connect', handler: onConnect });
            wsClient.off({ event: 'disconnect', handler: onDisconnect });
            wsClient.off({ event: 'connect_error', handler: onError });
        }
    }, []);

    const connect = () => {
        setStatus('connection')
        wsClient.connect()
    }

    const disconnect = () => {
        wsClient.disconnect();
        setIsConnection(false)
        setStatus('disconnected');
    };
    const on = useCallback(<T>(event: SocketEvent, handler: SocketHandler<T>) => {
        wsClient.on({ event, handler });
    },[])

    const off = useCallback(<T>(event: SocketEvent, handler?: SocketHandler<T>) => {
        wsClient.off({ event, handler });
    },[])

    const emit = <T>(event: SocketEvent, data?: T) => {
        wsClient.emit({ event, data });
    }

    const getStatus = (): string => {
    switch (status) {
        case 'connection': return 'Подключение...';
        case 'connected': return 'Подключено';
        case 'disconnected': return 'Отключено';
        case 'error': return 'Ошибка подключения';
        case null: return 'Загрузка...'
        default: return 'Ожидание';
        }
    }

    return { isConnection, error, status, getStatus, connect, disconnect, on, off, emit };
}