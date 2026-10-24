import { useEffect, useRef, useState } from "react"
import { useColor, useColorMenu } from "../shared"
import { ColorPreset } from "./"

export const ButtonColor = () => {
    const [ colors, setColors ] = useState<number[]>([])
    const { currentColor } = useColor()
    const { isOpen, setOpen } = useColorMenu()
    const posClient = useRef<{x: number, y: number}>({x: 300, y: 0})
    useEffect(() => {
        const result: Set<number> = new Set()
        for (let w = 0; w < 256; w += 51) result.add((w << 16) | (w << 8) | w)
        for (let r = 6; r <= 256; r += 51)
            for (let g = 6; g <= 256; g += 51)
                for (let b = 6; b <= 256; b += 51)
                    result.add((r << 16) | (g << 8) | b)
        const final = Array.from(result).slice(1)
        setColors(final)
        }, [])
    const handelClick = (e: React.MouseEvent) => {
        setOpen(!isOpen)
        if (isOpen) return
        const x = e.clientX
        const y = e.clientY
        posClient.current = {x:x,y:y}
    }
    return (
        <div>
            <div
            id="colorMenu"
            className={`${isOpen?'open':''}`}
            style={{left: `${posClient.current.x}px`, top: `${posClient.current.y+30}px`}}
            >
                {colors.map((c,i) => <ColorPreset key={i} color={c}/>)}
            </div>
        <button
            className='buttonMode'
            onClick={handelClick}
            >
                <div
                className='svgBox'
                style={{background: `#${currentColor.toString(16).padStart(6, 'ffffff')}`}}/>
            <p className='buttonModeText'>Цвет</p>
        </button>
        </div>
    )
}