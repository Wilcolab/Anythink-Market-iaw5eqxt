/**
 * Converts a string to camelCase.
 * Handles spaces, underscores, hyphens, and uppercase words.
 * Examples:
 *   first name      -> firstName
 *   user_id         -> userId
 *   SCREEN_NAME     -> screenName
 *   mobile-number   -> mobileNumber
 */
function toCamelCase(str) {
  return str
    .replace(/[_\-\s]+/g, ' ') // Normalize separators to spaces
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word, idx) => {
      word = word.toLowerCase();
      if (idx === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

// Example usage:
// console.log(toCamelCase('first name'));      // firstName
// console.log(toCamelCase('user_id'));         // userId
// console.log(toCamelCase('SCREEN_NAME'));     // screenName
// console.log(toCamelCase('mobile-number'));   // mobileNumber
