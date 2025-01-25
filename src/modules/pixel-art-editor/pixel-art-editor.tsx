import { Header } from "../core.components";
import { PixelArtEditorLayout } from "./components";
import { EditorSnaphostProvider } from "./provider";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <Header>Pixel Art Editor</Header>
      <PixelArtEditorLayout dockMenu={<>Menu</>}>Content</PixelArtEditorLayout>
    </EditorSnaphostProvider>
  );
}
