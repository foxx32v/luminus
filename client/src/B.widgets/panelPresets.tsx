import { BookLock, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Preset } from '../A.features';

export const PanelPresets = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div id="panelPresetsBox">
            <button
            onClick={() => setOpen(!isOpen)}
            id="switchButton"
            style={{ right: isOpen ? '250px' : '0' }}
            >
            {isOpen ? <BookOpen size={20} /> : <BookLock size={20} />}
        </button>
        <aside id="panelPresets"
            style={{ right: isOpen ? '0' : '-300px' }}>
                <h2>Пресеты</h2>
        </aside>
        </div>
    );
};