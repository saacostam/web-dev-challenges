import { Alert } from "../core.components";
import { Canvas, Menu, PixelArtEditorLayout } from "./components";
import { EditorSnaphostProvider } from "./providers";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <PixelArtEditorLayout className="hidden sm:flex" dockMenu={<Menu />}>
        <Canvas />
      </PixelArtEditorLayout>
      <Alert className="sm:hidden alert-warning">
        <span className="text-sm">
          The mobile view is not yet supported, but it's coming soon!
        </span>
      </Alert>
    </EditorSnaphostProvider>
  );
}
