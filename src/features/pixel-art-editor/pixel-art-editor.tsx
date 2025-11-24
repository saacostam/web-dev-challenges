import { Alert } from "../../shared/components";
import {
  Animation,
  Canvas,
  FrameManagement,
  KeyboardShortcuts,
  Menu,
  PixelArtEditorLayout,
} from "./components";
import { EditorSnaphostProvider } from "./providers";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <KeyboardShortcuts>
        <PixelArtEditorLayout
          className="hidden sm:flex"
          dockAnimation={<Animation />}
          dockFrameManagement={<FrameManagement />}
          dockMenu={<Menu />}
        >
          <Canvas />
        </PixelArtEditorLayout>
        <Alert className="sm:hidden alert-warning">
          <span className="text-sm">
            The mobile view is not yet supported, but it's coming soon!
          </span>
        </Alert>
      </KeyboardShortcuts>
    </EditorSnaphostProvider>
  );
}
