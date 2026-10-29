import { useMode, type ButtonModeProps } from "../../shared"

export const ButtonMode = ({title,mode,icon,additionalClick}: ButtonModeProps) => {
    const {currentMode,setMode} = useMode()
    const isActive = currentMode === mode
    const handleClick = () => {
        setMode(isActive ? null : mode)
        additionalClick?.()
    }
    return (
        <button
        onClick={handleClick}
        className={`buttonMode${isActive?` active`:``}`}
        >
        {icon&&<div className="buttonModeSvgBox">{icon}</div>}
        {title&&<p className="buttonModeText">{title}</p>}
        </button>
    )
}