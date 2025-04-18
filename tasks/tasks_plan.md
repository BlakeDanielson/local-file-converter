# Tasks Plan: Local File Converter v1.0 MVP

## Phase 1: Project Setup & Core UI

- [x] **Setup-1:** Initialize React project using chosen build tool (Vite/Webpack).
- [x] **Setup-2:** Configure build tool for WASM and Web Worker support.
- [x] **Setup-3:** Choose and integrate styling solution (CSS Modules/Styled-components/Tailwind).
- [x] **Setup-4:** Implement basic application layout/shell.
- [x] **UI-1 (F1):** Implement file selection UI (Drag-and-drop area).
- [x] **UI-2 (F1):** Implement file selection UI (Browse button - `<input type="file">`).
- [ ] **UI-3 (F2):** Implement UI for selecting target output format (dynamically populated).
- [ ] **UI-4 (F5):** Implement basic UI for progress indication (placeholder for spinner/percentage).
- [ ] **UI-5 (F6):** Implement UI element to display/trigger download link.
- [ ] **UI-6 (F7):** Implement basic UI area for displaying error messages.
- [x] **Core-1 (F3):** Implement client-side file reading (metadata) via File API.
- [x] **Core-2 (F3):** Implement client-side file size validation (< 100MB).
- [x] **Core-3:** Implement basic Web Worker setup and communication channel (main thread <-> worker).
- [x] **Core-4 (F7):** Implement initial error handling framework.

## Phase 2: MVP Conversion Implementation (Iterative)

*(Note: Each conversion requires finding/building/integrating JS/WASM, implementing worker logic, updating UI)*

- [ ] **Conv-1 (PDF -> DOCX):** Implement conversion logic.
- [ ] **Conv-2 (DOCX -> PDF):** Implement conversion logic.
- [ ] **Conv-3 (JPG -> PNG):** Implement conversion logic.
- [ ] **Conv-4 (PNG -> JPG):** Implement conversion logic.
- [ ] **Conv-5 (HEIC -> JPG):** Implement conversion logic.
- [ ] **Conv-6 (JPG -> PDF):** Implement conversion logic (single image to single page).
- [ ] **Conv-7 (PNG -> PDF):** Implement conversion logic (single image to single page, transparency).
- [ ] **Conv-8 (MP4 -> MP3):** Implement conversion logic.
- [ ] **Conv-9 (PDF -> JPG):** Implement conversion logic (page selection/range to multiple JPGs).
- [ ] **Conv-10 (MOV -> MP4):** Implement conversion logic.
- [ ] **Conv-11 (MP4 -> GIF):** Implement conversion logic (consider basic options).

## Phase 3: Refinement & Testing

- [ ] **Refine-1 (F5):** Integrate actual progress reporting (percentage or indeterminate) from workers to UI.
- [ ] **Refine-2 (F6):** Implement Blob URL generation and download link logic.
- [ ] **Refine-3 (F7):** Enhance user-friendliness of error messages.
- [ ] **Refine-4:** Implement lazy loading for conversion modules if feasible.
- [ ] **Test-1:** Write Unit Tests for core components and utilities.
- [ ] **Test-2:** Write Integration Tests for main thread/worker communication.
- [ ] **Test-3:** Implement E2E tests for key conversion flows (Recommended).
- [ ] **Test-4:** Perform Cross-Browser Testing.
- [ ] **Security-1:** Implement Content Security Policy (CSP).
- [ ] **Deploy-1:** Set up static hosting and deployment pipeline.

## Known Issues / Backlog

- *Track bugs and minor improvements discovered during development here.* 