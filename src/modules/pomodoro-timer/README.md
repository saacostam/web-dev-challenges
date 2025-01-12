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
- [ ] FEAT: Add skip button.
- [ ] FEAT: Handle when the state is hard-moved.
- [ ] FEAT: Notifications
  - [ ] Make a Sound
  - [ ] Volume Handling
  - [ ] Audio Context Acceptance
  - [ ] Notification Listening - Might require keeping some state
- [ ] FEAT-NTH: Visualize the current interval.
- [ ] DOCS: Complete the README.md file.
