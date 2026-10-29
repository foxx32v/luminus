import { usePreset, type PresetProps } from '../../shared';
import { ButtonSvg } from './buttonSvg';
import { Loader, Trash2 } from 'lucide-react';

const PREVIEW = 64;

export const Preset = (props: PresetProps) => {
    const { canvasRef, removePreset, loadPreset, isOpenMenu, posMenu,   handleClick, handleLeave } = usePreset(props);

    return (
        <div className="presetBox"
        onClick={handleClick}
        >
            <div
                className={`presetOptionBox${isOpenMenu ? 'Open' : ''}`}
                onMouseLeave={handleLeave}
                style={{ left: posMenu.x-35, top: posMenu.y-20 }}
                >
                <ButtonSvg icon={<Loader size={20}/>} title='загрузить' additionalClick={loadPreset}/>
                <ButtonSvg icon={<Trash2 size={20} />} title="удалить" additionalClick={removePreset} />
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