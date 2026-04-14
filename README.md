# Warkah Template Development Sandbox

Welcome to the Warkah Template Development Sandbox. This repository is a specialized environment for implementing invitation templates for the Warkah platform.

## Objective
Implement high-quality standard templates based on provided assets, ensuring smooth GSAP animations and adherence to the `StandardDesignConfig`.

## Architecture Overview
- **Shared Types**: Found in `templates/_shared/types.ts`. All templates must implement the `BaseTemplateProps` and use the `TemplateConfig` interface.
- **Standard Engine**: The `StandardBaseTemplate` dynamically renders sections based on a JSON configuration.
- **Decoration Packs**: These are modular GSAP-animated components located in `templates/standard-engine/decorations/`.

## Workflow
1.  **Reference Implementation**: Study `SoftPastelDecor.tsx` and `PastelRoseDecor.tsx` to understand the sway, flutter, and twinkling animation patterns.
2.  **Implementation**: Create a new decoration component in `templates/standard-engine/decorations/`.
3.  **Registration**:
    - Add your decoration pack to `DECORATION_PACKS` in `decorations/index.tsx`.
    - Define a new `TemplateConfig` in `templates/registry.tsx`.
    - Add the template entry to `TEMPLATE_MAP` in `templates/registry.tsx`.

## Project Rules
Refer to `AGENTS.md` for critical rules regarding:
- Next.js Image component usage.
- Descriptive position comments for decorative elements.
- GSAP animation best practices.

## Tools
- Use **GSAP** for all decorative animations.
- Use **Tailwind CSS** for layout and static styling.
