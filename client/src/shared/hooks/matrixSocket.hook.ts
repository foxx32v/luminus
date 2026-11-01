import { useEffect } from "react";
import { CONSTANTS_CONFIG, useMatrix, useSocket, type MatrixType } from "../";

const SOCKET_TIMEOUT = CONSTANTS_CONFIG.SOCKET_TIMEOUT

export function useMatrixSocket() {
    const { matrix, isRemote, setRemote, setMatrix } = useMatrix();
    const { isConnection, off, emit, on } = useSocket();

    useEffect(() => {
    if (!isConnection || isRemote) {
        isRemote&&setRemote(false)
        return
    }
        const timeOut = setTimeout(() => {
        emit('matrix:update', { matrix })
        }, SOCKET_TIMEOUT)
        return () => clearTimeout(timeOut);
    }, [matrix, isConnection])

    useEffect(() => {
        on('matrix:update', (data:{matrix:MatrixType})=>{
            if (JSON.stringify(matrix) == JSON.stringify(data.matrix)) return
            setRemote(true)
            setMatrix(data.matrix)
        })
        return (() => off('matrix:update'))
    },[matrix, isConnection, isRemote])

    const animate = (from: MatrixType, to: MatrixType, step:number) => {
        emit('preset:animate', { from, to, step });
    };

    return {animate}
}