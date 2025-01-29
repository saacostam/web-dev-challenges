import { useEffect, useRef } from "react";
import { CanvasManager } from "../managers";
import { useEditorSnapshot } from "../providers";

export function Canvas() {
  const { dispatch, editorSnapshot } = useEditorSnapshot();

  const canvasRef = useRef(null);
  const canvasManager = useRef<CanvasManager>(null as unknown as CanvasManager);

  useEffect(
    () => {
      canvasManager.current = new CanvasManager({
        baseCanvas: canvasRef.current!,
        dispatch: dispatch,
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
      dispatch: dispatch,
      editorSnapshot: editorSnapshot,
    });
  }, [dispatch, editorSnapshot]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <canvas
        className="absolute pointer-events-auto"
        ref={canvasRef}
        width="1500"
        height="1500"
        style={{ aspectRatio: "1/1", height: "100%" }}
      />
    </div>
  );
}
