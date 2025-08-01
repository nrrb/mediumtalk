# App Development Plan

This plan outlines the development tasks for the Medium Talk application, based on the requirements in `README.md`.

## Phase 1: Core Functionality & Structure

- [ ] **Set up Vue.js 3 Project:**
    - [ ] Initialize with Vite.
    - [ ] Integrate Vue Router for routing.
    - [ ] Integrate Pinia for state management.
- [ ] **Data Structure for Questions:**
    - [ ] Define a data structure for questions (e.g., in a JSON file).
    - [ ] Each question should have properties for `text`, `level` ('Surface', 'Sub-Surface', 'Core'), and `type` ('1:1' or 'group').
    - [ ] Create a script or process to parse `questions.md` and populate the data structure. The resulting question object should have fields `text`, `level`, and `type`.
- [ ] **Component Creation:**
    - [ ] `QuestionDisplay.vue`: Component to display a single question.
    - [ ] `LevelIndicator.vue`: Text chip for the question level (top right).
    - [ ] `TypeIndicator.vue`: Text chip for the question type (1:1/group) (top left).

## Phase 2: Routing and Instances

- [ ] **Implement Dynamic Routing:**
    - [ ] Create routes for different instances (e.g., `/baltimore`, `/philadelphia`).
    - [ ] Each instance route will render the main question-viewing interface.
- [ ] **Instance Configuration:**
    - [ ] Create a configuration object or file for instances.
    - [ ] Each instance needs a `name`, `path`, and `colorScheme` (background, text, chip background, chip text).
- [ ] **Home Page (`/`):**
    - [ ] Create the home page component.
    - [ ] Implement the specified vertical layout: Title > Random Question > Description > List of Instances > Attribution.

## Phase 3: UI/UX and Styling

- [ ] **Styling and Layout:**
    - [ ] Implement a mobile-first, responsive design.
    - [ ] Create a minimalist, clean interface with a readable, centered font for the question.
    - [ ] Dynamically apply the color scheme based on the current instance's route.
- [ ] **Swipe Interface:**
    - [ ] Integrate a library (like Hammer.js or a Vue equivalent) to handle swipe gestures.
    - [ ] **Swipe Left/Right:** Navigate to a random question within the current level.
    - [ ] **Swipe Up/Down:** Change levels and navigate to a random question in the new level.
        -   `Surface` -> swipe up -> `Core`
        -   `Core` -> swipe down -> `Surface`
        -   (Define behavior for `Sub-Surface` level swipes).

## Phase 4: Finalization and Deployment

- [ ] **GitHub Pages Setup:**
    - [ ] Configure `vite.config.js` with the correct `base` property for the GitHub Pages repository name.
- [ ] **Open Source Questions:**
    - [ ] Ensure the `questions.md` file is well-formatted and included in the repository.
- [ ] **Final Review:**
    - [ ] Test all features, including routing, swipe gestures, and responsiveness on different devices.
- [ ] **Deployment:**
    - [ ] Build the application (`npm run build`).
    - [ ] Deploy the `dist` folder to the `gh-pages` branch.
