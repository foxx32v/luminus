import type { ReactNode } from 'react';
import type { modesType } from './type.dto';

export interface ButtonModeProps {
    title?: string;
    mode: modesType;
    icon?: ReactNode;
    additionalClick?: () => void
}

export interface ButtonSvgProps extends Omit<ButtonModeProps, 'mode'> {
    additionalClick?: (e?: any) => void
    mode?: never;
    customClassName?: string;
}

export interface PresetProps {
    id: string;
    title?: string;
    content: number[];
}

export interface ColorProps {
    color: number;
}