import { Canvas, Menu, PixelArtEditorLayout } from "./components";
import { EditorSnaphostProvider } from "./provider";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <PixelArtEditorLayout dockMenu={<Menu />}>
        <Canvas />
      </PixelArtEditorLayout>
    </EditorSnaphostProvider>
  );
}
