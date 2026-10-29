import { useEffect, useState } from "react";
import type { LoaderProps, LoaderElementProps } from '../../shared';

const LoaderElement = ({go, size}: LoaderElementProps) => {
    return (
    <div
        className={`loaderElement${go?'Active':''}`}
        ></div>
    )
}

const ROWS = Array.from({length: 9}, (_,i)=>i+1);

export const Loader = ({isLoad,size=40}: LoaderProps) => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (!isLoad) return
        const id = setInterval(()=>{
            setIndex(prev => prev % 9 + 1)
        },100)
        return () => clearInterval(id);
    },[isLoad])

    return (
        <div className={`loaderBox${isLoad?'Active':''}`}
        style={{width:size,height:size}}
        >
            {ROWS.map(i =>
            <LoaderElement key={i} size={size} go={i == index}/>)}
        </div>
    )
}