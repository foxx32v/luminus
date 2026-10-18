import type { ReactNode } from 'react';
import type { modesType } from './type.dto';

export interface ButtonModeProps {
    title?: string;
    mode: modesType;
    icon?: ReactNode;
}

export interface PresetProps {
    id: string;
    title?: string;
    content: number[];
    onLoad?: (id: string) => void;
}