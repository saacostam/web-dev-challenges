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
- [ ] FEAT: Show animation.
- [ ] FEAT: Arrow keys should navigate frames.
- [ ] FEAT: Focus the frame with the latest changes.
- [ ] FEAT: Store in local-storage.
- [ ] FEAT: Export app file.
- [ ] FEAT: Export sprite file.
- [ ] FEAT: Toogle between second button role: secondary-color vs. delete.
- [ ] FEAT: Add an error boundary.
- [ ] FEAT: Create keyboard hot-keys visualizer.
- [ ] REFACTOR: Centralize menu buttons (undoredo, menu-options, color-picker?).
- [ ] FEAT: Mobile Support?
- [ ] DOCS: Add js-doc annotations to types.
- [ ] DOCS: Add js-doc to complex business logic.
- [ ] DOCS: Document module code structure - implementation details.
- [ ] PERF: `frame-preview.tsx` is rendering as often as possible (empty dep array) because frame is not inmutable.
- [ ] PERF: Re-visit the hover for pencil option (maybe other as well).
  - [ ] Also, transition between not-clicked to clicked.
- [ ] TEST: Add unit tests.
- [ ] FEAT: Add transparent as an option in color picker.
