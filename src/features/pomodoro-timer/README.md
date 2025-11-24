# Pomodoro Timer

A React module for implementing a Pomodoro timer.

## Introduction

- **Purpose:** Provide a functional and feature-rich Pomodoro timer implementation using React. The module is designed to be easy to use and offers the core features commonly found in similar applications.
- **Target Audience:** Software Engineers

## Table of Contents

- Introduction
- Usage
- Implementation Details
  - State Management
  - Time Management
  - Storage Management
- Glossary
- Tasks

## Usage

Import and render the `PomodoroTimer` component in your React application:

```tsx
import { PomodoroTimer } from "@/modules/pomodoro-timer";

function App() {
  return <PomodoroTimer />;
}
```

## Implementation Details

### State Management

- The app state is managed using two objects: `snapshot` and `settings`, defined in the `types` folder. These objects uniquely identify and allow the application state to be recreated at any time.
  - **Settings:** Stores user configurations for the app.
  - **Snapshot:** Holds the current operational state of the app.

(For more details, refer to the JSDoc comments.)

- User configuration rules and limitations are centralized in the `constants` folder.

### Time Management

- JavaScript timeouts can be unreliable as they only schedule callbacks, which may not execute precisely at the specified time. This behavior can result in timing inaccuracies.
- Callbacks are executed more frequently (at intervals shorter than 1000ms), and elapsed time is dynamically calculated based on the difference between the last recorded time and the current time.
  - This approach ensures precise elapsed time updates, even when the browser limits resources temporarily.
  - **Limitation:** If the timer remains resource-deprived for an extended period, it will only update the current Pomodoro stage (work or break) upon resumption, which is considered acceptable.

### Storage Management

- The app state is persisted in local storage and updated whenever the state changes.
- Type guards are used to validate the stored data against defined types. When extending the module, ensure the type guards are updated to reflect any changes to the state structure.

## Glossary

- **Pomodoro Technique:** A time management method using work/break intervals.
- **SnapShot:** The state of a system at a particular point in time.

## Tasks

- [x] FEAT: Implement state
  - [x] FEAT: Types
  - [x] FEAT: Reducer Implementation
  - [x] FEAT: Storage and Safe Retrival from Local Storage
- [x] FEAT: Dumb UI Components
  - [x] Timer
  - [x] Tasks
- [x] FEAT: Timer Logic:
  - [x] Interval Logic - Add new param to snapshot `updateAt:seconds` to manage unreliable intervals.
  - [x] Interval Logic - Gurantee that it is called when possible. Check dependencies and recreations.
  - [x] Update to state snapshot
- [x] FEAT: State (work, short or long break) Resolution
  - [x] Resolve to correct state duration
  - [x] Update the state when necessary
- [x] FEAT: Tasks State Management
  - [x] Refactor to add IDs
  - [x] Add Cards
  - [x] Update Cards
  - [x] Delete Cards
- [x] FEAT: Add skip button.
- [x] FEAT: Handle when the state is hard-moved.
- [x] FEAT: Notifications
  - [x] Make a Sound
  - [x] Volume Handling
  - [x] Notification Listening - Might require keeping some state
- [x] DOCS: Complete the README.md file.
- [x] DOCS: Create JSDoc comments.
- [ ] TEST: Create unit tests for module.
  - [ ] Domain
  - [ ] Components
  - [ ] Hooks
