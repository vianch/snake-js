/**
 * Generates a random number between 1 and the specified size.
 * @param {number} size - The upper limit for the random number generation.
 * @returns {number} - The generated random number.
 */
export const generateRandomNumber = (size) =>
	Math.floor(Math.random() * size) + 1;

export function debounce(callback, wait) {
	let timerId;

	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			callback(...args);
		}, wait);
	};
}
