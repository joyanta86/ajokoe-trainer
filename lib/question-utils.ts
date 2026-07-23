/** The minimum shape the permutation needs — satisfied by both exam tracks. */
export interface PermutableQuestion {
  id: string;
  options: string[];
  correctAnswer: number;
  /** Optional parallel translation of `options`, permuted in lockstep. */
  optionsFi?: string[];
}

/**
 * Questions are authored with the correct option written first, which keeps the
 * source file readable and reviewable. Shipping them in that order would make
 * the exam trivially gameable, so the options are permuted here.
 *
 * The permutation is derived from the question id, so it is stable across
 * reloads, identical on server and client (no hydration mismatch) and identical
 * for every user — a stored result stays interpretable.
 */

/** FNV-1a: small, fast, well-distributed string hash. */
function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/** Mulberry32 PRNG — deterministic for a given seed. */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Return the question with its options permuted and `correctAnswer` remapped. */
export function withDeterministicOptionOrder<T extends PermutableQuestion>(question: T): T {
  const random = createRandom(hashString(question.id));
  const indices = question.options.map((_, index) => index);

  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return {
    ...question,
    options: indices.map((originalIndex) => question.options[originalIndex]),
    // Keep any parallel translation aligned with the permuted English options.
    ...(question.optionsFi
      ? { optionsFi: indices.map((originalIndex) => question.optionsFi![originalIndex]) }
      : {}),
    correctAnswer: indices.indexOf(question.correctAnswer),
  };
}
