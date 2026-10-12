// Reads design tokens straight from the synced tokens, so the pages that
// show them never drift from what the frontend ships. Used by the
// ColorPalette and TokenScale components, and by the Markdown version of
// those pages.
import tokens from "../styles/tokens.css?raw";

export type Palette = "primary" | "neutral" | "orange" | "red" | "green";
export type Scale = "space" | "radius" | "font-size";

export interface TokenValue {
  token: string;
  value: string;
}

export function paletteSwatches(palette: Palette): TokenValue[] {
  const pattern = new RegExp(`--ha-color-${palette}-(\\d+):\\s*(#[0-9a-fA-F]{3,8});`, "g");
  const swatches = [...tokens.matchAll(pattern)].map(([, step, value]) => ({
    token: `--ha-color-${palette}-${step}`,
    value,
  }));

  if (swatches.length === 0) {
    throw new Error(`No tokens found for the "${palette}" palette`);
  }

  return swatches;
}

const SCALE_PREFIXES: Record<Scale, string> = {
  space: "--ha-space-",
  radius: "--ha-border-radius-",
  "font-size": "--ha-font-size-",
};

// Font sizes are written as calc(14px * var(--ha-font-size-scale)). Show the
// base size, which is what designers work with.
function readableValue(value: string): string {
  const pixels = value.match(/(\d+(?:\.\d+)?px)/);
  return pixels ? pixels[1] : value.trim();
}

export function tokenScale(scale: Scale): TokenValue[] {
  const pattern = new RegExp(`(${SCALE_PREFIXES[scale]}[a-z0-9]+):\\s*([^;]+);`, "g");

  const seen = new Set<string>();
  const steps = [...tokens.matchAll(pattern)]
    .filter(([, token]) => {
      // Only the first definition counts, later ones are dark mode copies.
      if (seen.has(token) || token.endsWith("-scale")) {
        return false;
      }
      seen.add(token);
      return true;
    })
    .map(([, token, value]) => ({ token, value: readableValue(value) }));

  if (steps.length === 0) {
    throw new Error(`No tokens found for the "${scale}" scale`);
  }

  return steps;
}
