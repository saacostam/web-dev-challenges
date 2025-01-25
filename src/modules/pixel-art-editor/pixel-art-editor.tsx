import { Header } from "../core.components";
import { EditorSnaphostProvider } from "./provider";

export function PixelArtEditor() {
  return (
    <EditorSnaphostProvider>
      <Header>Pixel Art Editor</Header>
    </EditorSnaphostProvider>
  );
}
