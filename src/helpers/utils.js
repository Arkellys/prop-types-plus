/**
 * Converts an array into an object with the indexes as keys.
 * @param {Array} array - Array to convert
 * @returns {object} Object version of the array
 */

export const arrayToObject = (array) => (
	array.reduce((object, value, index) => ({ ...object, [index]: value }), {})
);

/**
 * Tests whether a value is `null` or `undefined`.
 * @param {any} value - Value to test
 * @returns {boolean} Result of the text
 */

export const isNil = (value) => (
	value === null || value === undefined
);

/**
 * Tests whether a value is a function.
 * @param {any} value - Value to test
 * @returns {boolean} Result of the test
 */

export const isFunction = (value) => (
	typeof value === "function"
);