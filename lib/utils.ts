/** Join conditional class names. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Safe percentage, returning 0 rather than NaN when `total` is 0. */
export function percentage(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}
