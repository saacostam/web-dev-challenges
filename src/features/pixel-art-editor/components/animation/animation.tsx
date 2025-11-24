import { Range } from "../../../../shared/components";
import { useEditorSnapshot } from "../../providers";
import { CanvasAnimation } from "./canvas-animation";

export function Animation() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  return (
    <div className="w-36 p-2 border-2 border-primary rounded-lg">
      <CanvasAnimation
        currentFrame={editorSnapshot.currentFrame}
        fps={editorSnapshot.fps}
        frames={editorSnapshot.frames}
      />
      <div className="mt-2 inline-flex gap-1 items-center">
        <Range
          className="range-xs"
          min={0}
          max={30}
          onChange={(e) =>
            dispatch({
              type: "fps",
              payload: {
                fps: +e.target.value,
              },
            })
          }
          value={editorSnapshot.fps}
        />
        <span className="text-xs text-nowrap w-16 font-mono text-right">
          {editorSnapshot.fps} FPS
        </span>
      </div>
    </div>
  );
}
