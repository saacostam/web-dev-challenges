# Pomodoro Timer

A React module for implementing a Pomodoro timer.

## TODOS

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
- [ ] DOCS: Complete the README.md file.
