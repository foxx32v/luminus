import { Canvas, Toolbar, PanelPresets, MainLoader } from "../B.widgets"

export const Page = () => {
    return (
        <div id="page">
            <Toolbar/>
            <Canvas/>
            <PanelPresets/>
            <MainLoader/>
        </div>
    )
}