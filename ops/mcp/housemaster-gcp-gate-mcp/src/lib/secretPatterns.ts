/**
 * Shared secret-avoidance patterns, filename-level and content-level.
 * Centralized here (per the concept doc's own planned
 * policies/secretPatterns.ts, §18) so every tool that touches
 * filenames or file/diff content applies the same rules consistently.
 */

// Filenames that look like they could carry secrets. Used only to flag
// or reject a path, never to read the file's contents for this check.
export const SECRET_LOOKING_FILENAME =
  /(^|[\\/])\.env(\..+)?$|secret|credential|\.pem$|\.key$/i;

// Content-level patterns: matched against text that is otherwise
// allowed to be read (e.g. a git diff body), to catch secrets
// accidentally embedded in an innocently-named file. Best-effort, not
// exhaustive — a heuristic safety net, not a guarantee.
const SECRET_LOOKING_CONTENT_PATTERNS: RegExp[] = [
  /DATABASE_URL\s*=\s*\S+/i,
  /postgres(?:ql)?:\/\/[^\s'"]+:[^\s'"]+@[^\s'"]+/i,
  /(api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"\s]{8,}['"]/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
];

export function containsSecretLookingContent(text: string): boolean {
  return SECRET_LOOKING_CONTENT_PATTERNS.some((re) => re.test(text));
}
