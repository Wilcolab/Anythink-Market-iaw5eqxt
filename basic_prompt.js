// Converts a string to camelCase
function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, ' ') // Replace non-alphanumeric with space
    .split(' ')
    .filter(Boolean)
    .map((word, idx) =>
      idx === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

// Example usage:
// console.log(toCamelCase('hello world')); // Output: helloWorld


