import { MoonStar, SunDim } from "lucide-react"
import { CONSTANTS_CONFIG, useTheme, useThemeStore } from "../../shared"
import { ButtonSvg } from "./buttonSvg";

const ICON_SIZE = CONSTANTS_CONFIG.ICON_SIZE;

export const ButtonTheme = () => {
    const { currentTheme } = useThemeStore()
    const { toggleTheme } = useTheme()
    const handleClick = () => {
        toggleTheme()
    }
    const getIcon = () => currentTheme == 'light' ?
            <ButtonSvg title="Светлая" icon={<SunDim size={ICON_SIZE}/>}/> :
            <ButtonSvg title="Темная" icon={<MoonStar size={ICON_SIZE}/>}/>
    return (
        <div
        className="buttonTheme"
        onClick={handleClick}
        >
        {getIcon()}
        </div>
    )
}