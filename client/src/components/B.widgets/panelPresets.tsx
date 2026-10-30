import { BookLock, BookOpen, Check, Plus } from 'lucide-react';
import { Preset, Loader, ButtonSvg } from '../A.features';
import { CONSTANTS_CONFIG, usePanelPresets, usePresetsBar } from '../../shared';

const ICON_SIZE = CONSTANTS_CONFIG.ICON_SIZE

export const PanelPresets = () => {
    const { isOpenSideBar, setOpenSideBar } = usePresetsBar();
    const { isOpenMenuAdding, posMenu, titleRef, isLoading, data, openAddingMenu, savePreset, menuLeave } = usePanelPresets()

    return (
        <div id="panelPresetsBox">
            <div
                id="menuAddingPreset"
                className={isOpenMenuAdding ? 'open' : ''}
                style={{ left: posMenu.x - 200, top: posMenu.y + 20 }}
                onMouseLeave={menuLeave}
                >
                <input ref={titleRef} placeholder="Введите название" />
                <ButtonSvg title="готово" icon={<Check size={ICON_SIZE} />} additionalClick={savePreset} />
            </div>
            <ButtonSvg
                icon={isOpenSideBar ? <BookOpen size={ICON_SIZE} /> : <BookLock size={ICON_SIZE} />}
                title={isOpenSideBar ? 'закрыть' : 'открыть'}
                additionalClick={() => setOpenSideBar(!isOpenSideBar)}
                customClassName={`switchButton${isOpenSideBar ? 'Active' : ''}`}
            />
            <aside id="panelPresets" className={isOpenSideBar ? 'barOpen' : ''}>
                <div className="header">
                    <ButtonSvg title="добавить" icon={<Plus size={ICON_SIZE} />} additionalClick={openAddingMenu} />
                </div>
                {isLoading ? <Loader size={ICON_SIZE*2} isLoad />
                : data?.map((p) => <Preset key={p.id} id={p.id} title={p.title ?? ''} content={p.content} />
                )}
            </aside>
        </div>
    );
};