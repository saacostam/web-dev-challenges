import { Header } from "../core.components";
import { Menu, PixelArtEditorLayout } from "./components";
import { EditorSnaphostProvider } from "./provider";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <Header>Pixel Art Editor</Header>
      <PixelArtEditorLayout dockMenu={<Menu />}>Content</PixelArtEditorLayout>
    </EditorSnaphostProvider>
  );
}
