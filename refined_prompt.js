/**
 * Adds two numbers and returns their sum.
 * Throws an error if inputs are not valid numbers.
 * Handles edge cases like undefined or null values.
 * @param {*} a - First number
 * @param {*} b - Second number
 * @returns {number} Sum of a and b
 */
function addNumbers(a, b) {
  if (a === undefined || b === undefined) {
    throw new Error('Both arguments must be provided.');
  }
  if (a === null || b === null) {
    throw new Error('Arguments cannot be null.');
  }
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Both arguments must be valid numbers.');
  }
  return a + b;
}

// Example usage:
// console.log(addNumbers(5, 3)); // 8
// addNumbers('5', 3); // Throws error

/**
 * Converts a string to dot.case format.
 * Handles spaces, underscores, hyphens, and uppercase words.
 * Examples:
 *   "first name"    -> "first.name"
 *   "user_id"       -> "user.id"
 *   "SCREEN_NAME"   -> "screen.name"
 *   "mobile-number" -> "mobile.number"
 * @param {string} str - Input string
 * @returns {string} Dot.case formatted string
 */
function toDotCase(str) {
  return str
    .replace(/[_\-\s]+/g, ' ') // Normalize separators to spaces
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(word => word.toLowerCase())
    .join('.');
}

// Example usage:
// console.log(toDotCase('first name'));      // first.name
// console.log(toDotCase('user_id'));         // user.id
// console.log(toDotCase('SCREEN_NAME'));     // screen.name
// console.log(toDotCase('mobile-number'));   // mobile.number

/*
Chain-of-task prompt for GitHub Copilot:

Step 1 — Basic conversion
- Implement a function named toKebabCase(str) that converts an input string to kebab-case.
- Normalize common separators (spaces, underscores, dots, slashes, and multiple hyphens) to single spaces,
    trim, split into words, lowercase them, and join with '-'.
- Examples (expected outputs): "First Name" -> "first-name", "user_id" -> "user-id", "mobile-number" -> "mobile-number".

Step 2 — Robustness and edge cases
- Add input validation: throw an Error if value is null or undefined; otherwise coerce non-strings using String().
- Correctly split camelCase and PascalCase (e.g., "screenName" -> "screen-name", "ScreenName" -> "screen-name").
- Collapse consecutive separators and remove any leading/trailing hyphens in the result.
- Preserve numeric tokens (e.g., "v2Endpoint" -> "v2-endpoint").

Step 3 — Normalization, documentation and tests
- Normalize Unicode by NFKD and strip diacritics so "naïve value" -> "naive-value".
- Remove or treat punctuation as separators (except digits and letters).
- Provide a JSDoc block describing behavior, parameter and return value, plus at least six example inputs/outputs in comments.
- Export the function for Node.js (module.exports = toKebabCase) and include 3–5 inline example assertions or commented expected outputs.

Constraints
- No external dependencies; keep function pure and efficient.
- Ensure deterministic output with no leading/trailing hyphens and single hyphens between tokens.

Please implement the function following these steps and constraints.
*/

/**
 * Convert a string to kebab-case.
 *
 * Behavior:
 * - Throws if input is null or undefined.
 * - Coerces non-string inputs via String().
 * - Normalizes Unicode using NFKD and strips diacritics.
 * - Splits camelCase / PascalCase and splits between letters and digits.
 * - Treats punctuation and most non-alphanumeric characters as separators.
 * - Collapses consecutive separators and produces no leading/trailing hyphens.
 * - Preserves numeric tokens (e.g., "v2Endpoint" -> "v2-endpoint").
 *
 * @param {*} input - The value to convert to kebab-case.
 * @returns {string} The kebab-cased string (lowercase, words joined by single hyphens).
 *
 * Examples:
 *   toKebabCase('First Name')      -> 'first-name'
 *   toKebabCase('user_id')         -> 'user-id'
 *   toKebabCase('mobile-number')   -> 'mobile-number'
 *   toKebabCase('screenName')      -> 'screen-name'
 *   toKebabCase('ScreenName')      -> 'screen-name'
 *   toKebabCase('naïve value')     -> 'naive-value'
 *   toKebabCase('v2Endpoint')      -> 'v2-endpoint'
 *   toKebabCase('XMLHttpRequest')  -> 'xml-http-request'
 */
function toKebabCase(input) {
    if (input === null || input === undefined) {
        throw new Error('toKebabCase: input must not be null or undefined');
    }

    // Coerce to string, normalize and strip diacritics
    let s = String(input).normalize('NFKD').replace(/\p{M}/gu, '');

    // Insert boundaries for camelCase / PascalCase and between letters & digits
    // Use Unicode-aware classes where appropriate.
    s = s
        .replace(/(\p{Ll}|\p{N})(\p{Lu})/gu, '$1 $2')       // lower/number -> Upper
        .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, '$1 $2')       // acronym boundary: XMLHttp -> XML Http
        .replace(/(\p{L})(\p{N})/gu, '$1 $2')               // letter -> number
        .replace(/(\p{N})(\p{L})/gu, '$1 $2');              // number -> letter

    // Replace any run of non-letters/digits with a single space (treat as separators)
    s = s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

    if (s === '') return ''; // nothing meaningful

    // Split on whitespace, lowercase tokens, join with single hyphens
    const tokens = s.split(/\s+/).filter(Boolean).map(t => t.toLowerCase());
    return tokens.join('-');
}

// Export for Node.js
module.exports = toKebabCase;

// Example assertions / expected outputs (commented)
// console.assert(toKebabCase('First Name') === 'first-name');
// console.assert(toKebabCase('user_id') === 'user-id');
// console.assert(toKebabCase('mobile-number') === 'mobile-number');
// console.assert(toKebabCase('screenName') === 'screen-name');
// console.assert(toKebabCase('naïve value') === 'naive-value');
// console.assert(toKebabCase('v2Endpoint') === 'v2-endpoint');
