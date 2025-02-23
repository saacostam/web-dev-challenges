import { useCallback } from "react";
import { useEditorSnapshot } from "../../providers";
import { AddFrameCta } from "./add-frame-cta";
import { FrameCta } from "./frame-cta";

export function FrameManagement() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  const onCreateFrameHandler = useCallback(
    (order: number) =>
      dispatch({
        type: "create-frame",
        payload: {
          order: order,
        },
      }),
    [dispatch],
  );

  const onClickFrameHandler = useCallback(
    (order: number) =>
      dispatch({
        type: "set-frame",
        payload: {
          order: order,
        },
      }),
    [dispatch],
  );

  const onClickDeleteFrameHandler = useCallback(
    (order: number) =>
      dispatch({
        type: "delete-frame",
        payload: {
          order: order,
        },
      }),
    [dispatch],
  );

  const onClickDuplicateFrameHandler = useCallback(
    (order: number) =>
      dispatch({
        type: "duplicate-frame",
        payload: {
          order: order,
        },
      }),
    [dispatch],
  );

  return (
    <div className="w-24 min-h-full max-h-full h-full overflow-y-auto overflow-x-hidden">
      <div className="mb-1 space-y-1">
        {editorSnapshot.frames.map((frame, index) => (
          <FrameCta
            active={frame === editorSnapshot.currentFrame}
            frame={frame}
            key={index}
            hideMultiFrameCta={editorSnapshot.frames.length === 1}
            onClickDeleteFrameHandler={() => onClickDeleteFrameHandler(index)}
            onClickDuplicateFrameHandler={() =>
              onClickDuplicateFrameHandler(index)
            }
            onClickFrameHandler={() => onClickFrameHandler(index)}
          />
        ))}
      </div>
      <AddFrameCta
        onClick={() => onCreateFrameHandler(editorSnapshot.frames.length)}
      />
    </div>
  );
}
