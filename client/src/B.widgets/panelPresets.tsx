import { BookLock, BookOpen, Check, Plus } from 'lucide-react';
import { Preset, Loader, ButtonSvg } from '../A.features';
import { usePanelPresets } from '../shared';

export const PanelPresets = () => {
    const { isOpenSideBar, setOpenSideBar, isOpenMenuAdding, posMenu, titleRef, isLoading, data, openAddingMenu, savePreset, menuLeave } = usePanelPresets()

    return (
        <div id="panelPresetsBox">
            <div
                id="menuAddingPreset"
                className={isOpenMenuAdding ? 'open' : ''}
                style={{ left: posMenu.x - 200, top: posMenu.y + 20 }}
                onMouseLeave={menuLeave}
                >
                <input ref={titleRef} placeholder="Введите название" />
                <ButtonSvg title="готово" icon={<Check size={20} />} additionalClick={savePreset} />
            </div>
            <ButtonSvg
                icon={isOpenSideBar ? <BookOpen size={20} /> : <BookLock size={20} />}
                title={isOpenSideBar ? 'закрыть' : 'открыть'}
                additionalClick={() => setOpenSideBar(!isOpenSideBar)}
                customClassName={`switchButton${isOpenSideBar ? 'Active' : ''}`}
            />
            <aside id="panelPresets" className={isOpenSideBar ? 'barOpen' : ''}>
                <div className="header">
                    <ButtonSvg title="добавить" icon={<Plus size={20} />} additionalClick={openAddingMenu} />
                </div>
                {isLoading ? <Loader size={30} isLoad />
                : data?.map((p) => <Preset key={p.id} id={p.id} title={p.title ?? ''} content={p.content} />
                )}
            </aside>
        </div>
    );
};