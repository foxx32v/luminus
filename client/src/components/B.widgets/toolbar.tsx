import { Brush, Move, PaintBucket, Trash2, Pipette, Eraser, Sun, Moon, ArrowLeft, ArrowRight } from 'lucide-react';
import { ButtonMode, ButtonSvg, ButtonColor, RecentColors, ButtonTheme } from '../A.features';
import { CONSTANTS_CONFIG, useCanvas, useMatrix } from '../../shared';

const ICON_SIZE = CONSTANTS_CONFIG.ICON_SIZE

export const Toolbar = () => {
    const { goTo } = useMatrix()
    const { clear, fill } = useCanvas()
    return (
        <div id="toolbar">
            <ButtonMode icon={<Move size={ICON_SIZE} />} mode="drag" title="Переместить" />
            <ButtonMode icon={<Brush size={ICON_SIZE} />} mode="draw" title="Кисть" />
            <ButtonMode icon={<Pipette size={ICON_SIZE} />} mode="eyedropper" title="Пипетка" />
            <ButtonMode icon={<Eraser size={ICON_SIZE} />} mode="eraser" title="Ластик" />
            <ButtonMode icon={<Sun size={ICON_SIZE} />} mode="toLighten" title="Осветлить" />
            <ButtonMode icon={<Moon size={ICON_SIZE} />} mode="toDarken" title="Затемнить" />
            <ButtonColor/>
            <RecentColors/>
            <div id='toolbarLeft'>
                <ButtonSvg icon={<ArrowLeft size={ICON_SIZE} />} title="Назад" additionalClick={()=>goTo(-1)} />
                <ButtonSvg icon={<ArrowRight size={ICON_SIZE} />} title="Вперёд" additionalClick={()=>goTo(1)} />
                <ButtonSvg icon={<PaintBucket size={ICON_SIZE} />} title="Залить" additionalClick={fill} />
                <ButtonSvg icon={<Trash2 size={ICON_SIZE} />} title="Очистить" additionalClick={clear} />
                <ButtonTheme/>
            </div>
        </div>
    );
};