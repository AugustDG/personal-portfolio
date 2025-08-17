// Lightweight reading time utility compatible with Edge/runtime (no Node APIs)
// Provides a minimal subset of the popular reading-time package API.
export interface ReadingTimeResult {
  words: number;
  minutes: number; // rounded minutes (ceil, minimum 1 if at least 1 word)
  time: number; // ms estimation
  text: string; // e.g. "3 min read"
}

/**
 * Estimate reading time for given text.
 * @param content Raw text/markdown content
 * @param wpm Words per minute (default 200)
 */
export function estimateReadingTime(
  content: string,
  wpm: number = 200,
): ReadingTimeResult {
  if (!content) {
    return { words: 0, minutes: 0, time: 0, text: "" };
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutesFloat = words / wpm;
  const minutes = Math.max(1, Math.ceil(minutesFloat));
  const time = Math.round(minutesFloat * 60 * 1000);

  return { words, minutes, time, text: `${minutes} min read` };
}
