import { Header } from "../core.components";
import { Canvas, Menu, PixelArtEditorLayout } from "./components";
import { EditorSnaphostProvider } from "./provider";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <Header>Pixel Art Editor</Header>
      <PixelArtEditorLayout dockMenu={<Menu />}>
        <Canvas />
      </PixelArtEditorLayout>
    </EditorSnaphostProvider>
  );
}
