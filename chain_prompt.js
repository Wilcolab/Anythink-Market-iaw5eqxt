/**
 * Convert a string to kebab-case.
 *
 * - Replaces groups of spaces and punctuation with a single hyphen.
 * - Preserves numbers and Unicode letters.
 * - Converts camelCase to kebab-case (e.g. "fooBar" -> "foo-bar").
 * - Trims leading/trailing separators.
 *
 * @param {any} input - Value to convert. Non-string values are coerced to string.
 * @returns {string} Kebab-cased string. Returns empty string for null/undefined or if nothing remains after cleaning.
 *
 * Examples:
 *   toKebabCase("Hello World")       -> "hello-world"
 *   toKebabCase(" foo   bar ")      -> "foo-bar"
 *   toKebabCase("end_of_line!")     -> "end-of-line"
 *   toKebabCase("camelCaseValue")   -> "camel-case-value"
 *   toKebabCase(null)               -> ""
 */
function toKebabCase(input) {
    if (input == null) return '';

    // Coerce to string and trim outer whitespace
    let str = String(input).trim();

    // Break camelCase boundaries (fooBar -> foo-Bar) before lowercasing
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

    // Replace any sequence of non-alphanumeric characters (including spaces and punctuation)
    // with a single hyphen. Uses Unicode property escapes to support international letters.
    str = str.replace(/[^\p{L}\p{N}]+/gu, '-');

    // Remove leading/trailing hyphens and convert to lowercase
    return str.replace(/^-+|-+$/g, '').toLowerCase();
}

module.exports = toKebabCase;

// Removed stray shell command that caused a syntax error.
// If you intended to run the git command, run it in a terminal, not inside this JS file.

// Note: run `git branch --show-current` in your shell if you need the current branch name.
