<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Next.js Image Optimization
- When using the Next.js `Image` component with the `fill` prop, you MUST always provide a `sizes` prop.
- This is critical for page performance and to prevent browser console warnings.
- Example: `sizes="(max-width: 768px) 100vw, 33vw"`
## Template Decorations
- Every decorative element (e.g., flowers, patterns, lines) MUST be preceded by a descriptive position comment (e.g., `{/* Position: Top Left */}`).
- This ensures clarity for future design edits and consistent implementation across all template engines.
<!-- END:nextjs-agent-rules -->
