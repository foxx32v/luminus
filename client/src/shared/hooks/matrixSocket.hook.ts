import { useEffect, useRef } from "react";
import { useMatrix, useSocket, type MatrixType } from "../";

export function useMatrixSocket() {
    const { matrix, setMatrix } = useMatrix();
    const { isConnection, off, emit, on } = useSocket();
    const isRemote = useRef(false);
    useEffect(() => {
    if (!isConnection || isRemote.current) {isRemote.current = false; return}
        const timeOut = setTimeout(() => {
        emit('matrix:update', { matrix })
        }, 100)
        return () => clearTimeout(timeOut);
    }, [matrix, isConnection])

    useEffect(() => {
        on('matrix:update', (data:{matrix:MatrixType})=>{
            if (JSON.stringify(matrix) == JSON.stringify(data.matrix)) return
            isRemote.current = true
            setMatrix(data.matrix)
        })
        return (() => off('matrix:update'))
    },[])

    const animate = (from: MatrixType, to: MatrixType, step:number) => {
        emit('preset:animate', { from, to, step });
    };

    return {animate}
}