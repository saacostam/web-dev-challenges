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
- [ ] FEAT: Slightly over-draw squares to avoid lines in-between pixels.
- [ ] FEAT: Handle show vs. not-show grid.
- [ ] FEAT: Implement the delete state-machine.
- [ ] FEAT: Toogle between second button role: secondary-color vs. delete.
- [ ] FEAT: Handle the cancel event.
- [ ] FEAT: Enable transparent colors.
- [ ] PERF: Re-visit the hover for pencil option (maybe other as well).
  - [ ] Also, transition between not-clicked to clicked.
- [ ] TEST: Add unit tests.
