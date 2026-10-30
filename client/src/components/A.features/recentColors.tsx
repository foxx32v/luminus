import { useEffect, useState } from "react"
import { CONSTANTS_CONFIG, useColor } from "../../shared"
import { ButtonSvg, ColorPreset } from "."
import { FolderClosed, FolderOpen } from "lucide-react"

const ICON_SIZE = CONSTANTS_CONFIG.ICON_SIZE

export const RecentColors = () => {
    const [open, setOpen] = useState(false)
    const { currentColor, setColor } = useColor()
    const [colors, setColors] = useState<number[]>([currentColor])
    useEffect(() => {
        if (colors.includes(currentColor)) return
        if (colors.length <= 10) setColors(prev => [...prev, currentColor])
        else setColors(prev => [...prev.slice(1), currentColor])
    },[currentColor])
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <div id="recentColorsBox"
        >
        <ButtonSvg icon={open?<FolderOpen size={ICON_SIZE}/>:<FolderClosed size={ICON_SIZE}/>} title={open?'Закрыть':'Открыть'} additionalClick={handleClick} />
        <div
        className={`recentColorsMenu${open?'Open':''}`}
        >
        {colors.map((c,i) => <ColorPreset key={i} color={c}/>)}
        </div>
        </div>
    )
}