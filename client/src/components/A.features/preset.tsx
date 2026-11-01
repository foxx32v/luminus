import { CONSTANTS_CONFIG, usePreset, type PresetProps } from '../../shared';
import { ButtonSvg } from './buttonSvg';
import { Loader, Trash2 } from 'lucide-react';

const PREVIEW = 64;
const ICON_SIZE = CONSTANTS_CONFIG.ICON_SIZE

export const Preset = (props: PresetProps) => {
    const { canvasRef, removePreset, loadPreset, isOpenMenu, posMenu,   handleClick, handleLeave } = usePreset(props);

    return (
        <div className="presetBox"
        onClick={handleClick}
        onMouseLeave={handleLeave}
        >
            <div
                onMouseLeave={handleLeave}
                className={`presetOptionBox${isOpenMenu ? 'Open' : ''}`}
                >
                <ButtonSvg icon={<Loader size={ICON_SIZE}/>} title='загрузить' additionalClick={loadPreset}/>
                <ButtonSvg icon={<Trash2 size={ICON_SIZE} />} title="удалить" additionalClick={removePreset} />
            </div>
            <canvas
                ref={canvasRef}
                width={PREVIEW}
                height={PREVIEW}
                className="presetPreview"
            />
            <p className="presetTitle">{props.title ?? 'Без названия'}</p>
        </div>
    );
};