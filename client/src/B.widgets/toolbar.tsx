import { Brush, Move, PaintBucket, Trash2, Pipette, Eraser, ArrowLeft, ArrowRight } from 'lucide-react';
import { ButtonMode, ButtonSvg, ButtonColor } from '../A.features';
import { useCanvas } from '../shared';

export const Toolbar = () => {
    const { clear, fill } = useCanvas()
    const iconSize = 20;
    return (
        <div id="toolbar">
            <ButtonMode icon={<Move size={iconSize} />} mode="drag" title="Переместить" />
            <ButtonMode icon={<Brush size={iconSize} />} mode="draw" title="Кисть" />
            <ButtonMode icon={<Pipette size={iconSize} />} mode="eyedropper" title="Пипетка" />
            <ButtonMode icon={<Eraser size={iconSize} />} mode="eraser" title="Ластик" />
            <ButtonColor/>
            <div id='toolbarLeft'>
                <ButtonSvg icon={<PaintBucket size={iconSize} />} title="Залить" additionalClick={fill} />
                <ButtonSvg icon={<Trash2 size={iconSize} />} title="Очистить" additionalClick={clear} />
            </div>
        </div>
    );
};