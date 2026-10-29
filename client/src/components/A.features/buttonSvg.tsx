import { type ButtonSvgProps } from "../../shared"

export const ButtonSvg = ({customClassName,title,icon,additionalClick}: ButtonSvgProps) => {
    return (
        <button
        onClick={additionalClick}
        className={`${customClassName} buttonMode`}
        >
        {icon&&<div className="buttonModeSvgBox">{icon}</div>}
        {title&&<p className="buttonModeText">{title}</p>}
        </button>
    )
}