# Pixel Art Editor

A React module for implementing a Pixel Art Editor.

## Introduction

- **Purpose:** Provide a functional Pixel Art Editor using React, with core features commonly found in similar applications.
- **Target Audience:** Software Engineers

## Table of Contents

- Introduction
- Usage
- Implementation Details
- Glossary
- Tasks

## Usage

Import and render the `PixelArtEditor` component in your React application:

```tsx
import { PixelArtEditor } from "@/modules/pixel-art-editor";

function App() {
  return <PixelArtEditor />;
}
```

## Implementation Details

## Glossary

- **SnapShot:** The state of a system at a particular point in time.

## Tasks

- [x] FIX: Check why the color input is closing when clicked.
- [x] FEAT: Implement the color picker state-machine.
- [x] FIX: Clean-up event listener for canvas-manager.
  - [x] FIX: Check if this solves the issue where after color-pick, a pen-like behaviour is seen.
- [x] FEAT: Implement the bucket state-machine.
- [x] FEAT: Slightly over-draw squares to avoid lines in-between pixels.
- [x] FEAT: Handle show vs. not-show grid.
- [x] FEAT: Handle the cancel event.
- [x] REFACTOR: Centralize drawing logic for buffer and canvas into a single function.
- [x] REFACTOR: Centralize hover logic for buffer in multiple state machines.
- [x] REFACTOR: Centralize clean-up logic (when hover effect has ended) for buffer in multiple state machines.
- [x] FEAT: Implement the eraser state-machine.
- [x] FEAT: Enable undo and redo buttons in UI.
- [x] FEAT: Hook undo and redo to keyboard hot-keys.
- [x] FEAT: Hook tool options to keyboard hot-keys.
- [x] FEAT: Disable undo and redo if not available.
- [x] FEAT: Set current frame as a snapshot attribute.
- [x] FEAT: Enable the creation of multiple frames.
  - [x] FEAT: Implement hook logic.
  - [x] FEAT: Create UI elements.
- [x] FEAT: Manage multiple frames.
  - [x] FEAT: Hook logic for deleting.
  - [x] FEAT: Hook logic for changing focused frame.
  - [x] FEAT: Hook logic for duplication.
- [x] FEAT: Show transparent in color-picker.
- [x] FEAT: Show animation.
- [x] FEAT: Arrow keys should navigate frames.
- [x] FEAT: Add transparent as an option in color picker.
- [x] FEAT: Focus newly create frame after duplicating.
- [x] FEAT: Store in local-storage.
- [x] FIX: Keep track of current frame by using id >> Add ids to frames.
- [x] FEAT: Read from local-storage.
- [x] FEAT: Export app file.
- [x] FEAT: Create new sprite CTA.
- [x] REFACTOR: Suffix all icons with "Icons" to convey usage.
- [x] FEAT: Add cancel button to import-to-json modal.
- [x] FEAT: Add an error boundary.
- [ ] FEAT(deprioritized): Export sprite file.
- [ ] FEAT(deprioritized): Create keyboard hot-keys visualizer.
- [ ] REFACTOR(deprioritized): Centralize menu buttons (undoredo, menu-options, color-picker?).
- [ ] PERF(deprioritized): `frame-preview.tsx` is rendering as often as possible (empty dep array) because frame is not inmutable.
- [ ] PERF(deprioritized): Re-visit the hover for pencil option (maybe other as well).
  - [ ] Also, transition between not-clicked to clicked.
- [x] TEST: Add tests for core logic
- [ ] TEST: Add tests for component
- [ ] TEST: Add tests for managers
- [x] DOCS: Add js-doc annotations to types.
- [ ] DOCS: Add js-doc to complex business logic.
- [ ] DOCS: Document module code structure - implementation details.
