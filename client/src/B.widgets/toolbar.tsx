import { Brush, Move, PaintBucket, Trash2, Pipette, Square, Minus } from 'lucide-react';
import { ButtonMode } from '../A.features';

export const Toolbar = () => {
    const iconSize = 20;

    return (
        <div id="toolbar">
            <ButtonMode icon={<Move size={iconSize} />} mode="drag" title="Переместить" />
            <ButtonMode icon={<Brush size={iconSize} />} mode="draw" title="Кисть" />
            <ButtonMode icon={<Pipette size={iconSize} />} mode="eyedropper" title="Пипетка" />
            <ButtonMode icon={<Minus size={iconSize} />} mode="line" title="Линия" />
            <ButtonMode icon={<Square size={iconSize} />} mode="rect" title="Квадрат" />
            <ButtonMode icon={<PaintBucket size={iconSize} />} mode="filling" title="Залить" />
            <ButtonMode icon={<Trash2 size={iconSize} />} mode="clear" title="Очистить" />
        </div>
    );
};