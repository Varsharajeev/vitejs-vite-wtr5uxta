```markdown
# Contract Management Platform (Frontend)

A frontend-only Contract Management Platform built with React + TypeScript + Vite + Tailwind + Zustand.

This application demonstrates:
- Blueprint creation (reusable templates) with configurable fields: Text, Date, Signature, Checkbox
- Contract generation from blueprints and filling fields
- Strict contract lifecycle: Created → Approved → Sent → Signed → Locked (Revoked is possible from Created or Sent)
- Contracts dashboard with filterable statuses
- Local persistence via localStorage
- Component-based architecture, clear state management, and an easy-to-extend codebase

---

## Live demo (local)
After copying files and installing dependencies (see below) run:

- Install:
  npm install

- Dev:
  npm run dev

Open http://localhost:5173

---

## Tech stack & rationale

- React + Vite + TypeScript:
  - Fast dev experience (Vite), type safety (TypeScript), familiarity and ecosystem (React).
- Zustand for state management:
  - Lightweight, simple store for UI state and app domain data.
- Tailwind CSS:
  - Rapid, consistent styling without design assets.
- localStorage persistence:
  - Simple mock persistence that satisfies the requirements without a backend. Easy to replace with real API calls.

---

## Project structure (important files)

- src/
  - main.tsx - app bootstrap
  - App.tsx - routes + global layout
  - index.css - Tailwind imports
  - types/ - domain models
  - services/persistence.ts - localStorage adapter
  - state/stateMachine.ts - contract lifecycle rules & validation
  - store/useStore.ts - Zustand store (blueprints & contracts)
  - store/initSeed.ts - seed sample data on first load
  - components/ - reusable components (Navbar, Button, FieldRenderer, SignaturePad, StatusBadge)
  - features/blueprints/ - blueprint creation and listing
  - features/contracts/ - contract creation, listing, and view
  - pages/ - top-level pages (Dashboard, BlueprintsPage, ContractsPage)

---

## How the core features are implemented

1. Blueprints
- Blueprint model contains fields: id, type, label, position (x,y %), optional width.
- Create a blueprint via New Blueprint page: user clicks on the canvas to place a field and configures its label/type.
- Blueprints are saved to localStorage via persistence adapter.

2. Contracts
- Create contract from blueprint (New Contract): the blueprint's fields are copied into a new contract instance with empty values.
- Field values can be edited via the Contract View page. Signature fields use a small canvas; saved as a data URL.

3. Lifecycle (state machine)
- State machine defined in src/state/stateMachine.ts with allowed transitions:
  - Created -> Approved
  - Approved -> Sent
  - Sent -> Signed
  - Signed -> Locked
  - Created -> Revoked
  - Sent -> Revoked
- Transitions are validated in the store (`transitionContract`) and UI only shows available actions.
- Locked contracts are read-only. Revoked contracts allow no further transitions.

4. Persistence
- persistence.ts wraps localStorage keys:
  - cmp_blueprints_v1
  - cmp_contracts_v1
- The Zustand store loads & saves to localStorage on operations.

---

## UX notes & design choices

- Canvas placement is percentage-based so the UI is responsive. For MVP, click-to-place is implemented.
- SignaturePad: pointer-based drawing saved as data URL. This is good for single-user demos and can be replaced by a proper eSignature provider if needed.
- The UI focuses on clarity and flow: Dashboard, Blueprints, Contracts, Create flows, and a clear action area within Contract View.
- Colors & badges are used to make statuses clear.

---

## Assumptions & limitations

- Local single-user app: no backend concurrency, no auth. Persistence is localStorage.
- Signature is saved as base64 data URL stored in localStorage; not secure or scalable — acceptable for demo.
- No PDF generation included.
- Drag-and-drop for field repositioning is not implemented — click-to-place is provided. This can be upgraded to drag-and-drop.
- No unit tests included by default; easy to add with Vitest / React Testing Library.

---

## Extending & productionizing

- Replace persistence with REST API calls (services/persistence.ts => API client).
- Add authentication & access control.
- Add PDF export & audit logs.
- Integrate e-signature provider (DocuSign/HelloSign) for legally binding signatures.
- Add more field types, validation rules, and templates sharing.

---

## How I built it (notes for reviewers)

- Structured features into `features/*` folders to keep related components and pages together.
- Centralized domain logic (state machine) in a single file so transitions are auditable and testable.
- Zustand chosen to keep store simple and avoid ceremony while preserving testability.
- Seeded a friendly sample blueprint on first load so the app is ready to use.

---

## Running locally - quick checklist

1. Create a new repo on GitHub and clone locally.
2. Copy all files into the repository preserving structure above.
3. Run:
   npm install
   npm run dev
4. Open http://localhost:5173

---

If you'd like:
- I can add unit tests (Vitest) for the state machine and store.
- I can implement drag-and-drop placement using react-dnd.
- I can prepare a branch-per-feature commit history (I can generate patch files you can apply if you want commit history given as separate commits).

If you want me to, I can now generate a numbered list of commands to create the git repo locally and commit all files in a good commit structure (scaffold → features → docs). Tell me if you'd like that.
```