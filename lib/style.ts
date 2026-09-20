import type { CSSProperties } from "react";

/**
 * The prototype authors every rule as an inline CSS string. Re-typing those as
 * JSX style objects is where a "pixel perfect" port quietly stops being pixel
 * perfect, so instead we keep the original declaration strings byte-for-byte
 * and parse them once, at module level, into React style objects.
 */
const cache = new Map<string, CSSProperties>();

function prop(name: string): string {
  const n = name.trim();
  if (n.startsWith("--")) return n;
  // -webkit-backdrop-filter -> WebkitBackdropFilter
  const camel = n.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return n.startsWith("-") ? camel.charAt(0).toUpperCase() + camel.slice(1) : camel;
}

export function s(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const out: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const key = decl.slice(0, i);
    const value = decl.slice(i + 1).trim();
    if (!key.trim() || !value) continue;
    out[prop(key)] = value;
  }
  const frozen = out as CSSProperties;
  cache.set(css, frozen);
  return frozen;
}

/** Merge a base declaration string with per-instance overrides. */
export function sx(css: string, extra?: CSSProperties): CSSProperties {
  return extra ? { ...s(css), ...extra } : s(css);
}
