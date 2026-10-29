import { useCanvas } from '../../shared';

export const Canvas = () => {
    const { size, offset, canvasRef, getCursor, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp} = useCanvas();
    return (
        <div id="canvasBox">
            <canvas
                ref={canvasRef}
                id="canvas"
                width={size}
                height={size}
                style={{
                    width: size,
                    height: size,
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    cursor: getCursor(),
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
            />
        </div>
    );
};