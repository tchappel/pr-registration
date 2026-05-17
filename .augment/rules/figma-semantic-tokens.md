---
type: "agent_requested"
description: "When working with .tsx files and styling components with Tailwind, verify Figma semantic classes/tokens are defined in src/index.css and add any that are missing."
---

# Figma semantic tokens in Tailwind/TSX

When editing or creating `.tsx` files that style components (including any use of Tailwind utility classes) and design context is sourced from Figma:

1. **Identify the Figma semantic tokens/classes used.**
   - When pulling design context (e.g. via the Figma MCP tools such as `get_design_context_figma`, `get_variable_defs_figma`, or `get_code_connect_map_figma`), collect every semantic token referenced — colors, spacing, radius, typography, shadow, etc. — that is expected to map to a Tailwind utility or CSS custom property.
   - Treat these as the source of truth for the styling you are about to write.

2. **Check `src/index.css` before applying them.**
   - Open `src/index.css` and verify that each semantic token used in the design is already defined there (e.g. as a CSS custom property under `:root` / `.dark`, or wired into the Tailwind theme via `@theme`).
   - Do not assume a token exists because it is referenced elsewhere — confirm by searching the file.

3. **Add any missing tokens to `src/index.css`.**
   - If a Figma semantic token is missing, add it to `src/index.css` in the section that matches its category (colors with colors, radii with radii, etc.) and follow the existing naming, ordering, and formatting conventions in that file.
   - Preserve the existing structure: extend the relevant block rather than introducing new top-level structures, and mirror dark-mode definitions when the surrounding tokens have them.
   - Use the exact value (hex, rem, etc.) provided by Figma. Do not invent values or approximate them.

4. **Only then style the component.**
   - After the tokens are confirmed present in `src/index.css`, apply them via the corresponding Tailwind utilities or CSS variables in the `.tsx` file.
   - Prefer the semantic token over raw primitive values (e.g. use the semantic color token rather than a hard-coded hex or a primitive ramp class).

This applies to any styling work in `.tsx` files driven by Figma designs, including new components, refactors, and visual fixes.
