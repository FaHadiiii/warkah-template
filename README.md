# Warkah Template Design Sandbox

This is a focused environment for building and previewing the visual design of Warkah templates.

## Objective
Implement high-quality standard templates. Focus 100% on **Visuals, Layout, and GSAP Animations**. 

## What's included?
- **Standard Engine**: The core logic that renders the top-level design.
- **Design Previewer**: A browser-based runner in `app/page.tsx` that shows the current design with high-quality mock data.
- **No Clutter**: All interactive drawers (RSVP, Maps, Gift) and database logic have been removed.

## How to Run
1. `npm install`
2. `npm run dev`
3. Open the localhost URL. Use the selector at the top left to switch designs.

## Workflow
1. Create your decoration component in `templates/standard-engine/decorations/`.
2. Register it in `registry.tsx`.
3. Preview it live in the browser to ensure the animations are smooth.

## Rules
- Focus on `GSAP` for animations.
- Every decorative element MUST have a position comment (e.g. `{/* Position: Top Right */}`).
- Use `Image` component with `fill` and `sizes` prop as per `AGENTS.md`.
