import { useColor, useColorMenu, useMode, type ColorProps } from '../../shared';

export const ColorPreset = ({color}:ColorProps) => {
    const { setOpen } = useColorMenu()
    const { setMode } = useMode()
    const { currentColor, setColor } = useColor()
    const handleClick = () => {
        setColor(color)
        setMode('draw')
    }
    return (
        <div
        onClick={handleClick}
        id={currentColor == color && 'chosenColor' || ''}
        className="colorPreset"
        style={{ background: `#${color.toString(16).padStart(6, '0')}`}}
        />
    )
}