import { useButtonColor } from '../../shared';
import { ColorPreset } from '.';

export const ButtonColor = () => {
    const { colors, currentColor, isOpen, pos, handleButtonClick, handleDragStart } = useButtonColor();

    return (
        <div>
            <div
                id="colorMenu"
                className={isOpen ? 'open' : ''}
                style={{ left: pos.x, top: pos.y + 30 }}
                onMouseDown={handleDragStart}
            >
                {colors.map((c, i) => <ColorPreset key={i} color={c} />)}
            </div>
            <button className="buttonMode" onClick={handleButtonClick}>
                <div
                    className="svgBox"
                    style={{ background: `#${currentColor.toString(16).padStart(6, '0')}` }}
                />
                <p className="buttonModeText">Цвет</p>
            </button>
        </div>
    )
}