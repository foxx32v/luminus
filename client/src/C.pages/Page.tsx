import { Canvas, Toolbar, PanelPresets } from "../B.widgets"

export const Page = () => {
    return (
        <div id="page">
            <Toolbar/>
            <Canvas/>
            <PanelPresets/>
        </div>
    )
}