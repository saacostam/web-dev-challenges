import { useEffect, useRef } from "react";
import { CanvasManager } from "../managers";
import { useEditorSnapshot } from "../providers";

export function Canvas() {
  const { editorSnapshot } = useEditorSnapshot();

  const canvasRef = useRef(null);
  const canvasManager = useRef<CanvasManager>(null as unknown as CanvasManager);

  useEffect(
    () => {
      canvasManager.current = new CanvasManager({
        baseCanvas: canvasRef.current!,
        editorSnapshot: editorSnapshot,
      });

      return () => {
        canvasManager.current?.cleaup();
      };
    },
    // This effect only runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!canvasManager.current) return;
    canvasManager.current.state({
      editorSnapshot: editorSnapshot,
    });
  }, [editorSnapshot]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        className="cursor-pointer"
        ref={canvasRef}
        style={{ aspectRatio: "1/1", height: "100%", ...BACKGROUND_STYLING }}
      />
    </div>
  );
}

const BACKGROUND_STYLING = {
  backgroundColor: "#c4c4c4",
  opacity: 0.6,
  backgroundImage:
    "repeating-linear-gradient(45deg, #777777 25%, transparent 25%, transparent 75%, #777777 75%, #777777), repeating-linear-gradient(45deg, #777777 25%, #c4c4c4 25%, #c4c4c4 75%, #777777 75%, #777777)",
  backgroundPosition: "0 0, 8px 8px",
  backgroundSize: "16px 16px",
};
