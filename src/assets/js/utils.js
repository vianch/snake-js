/**
 * Generates a random number between 1 and the specified size.
 * @param {number} size - The upper limit for the random number generation.
 * @returns {number} - The generated random number.
 */
export const generateRandomNumber = (size) =>
	Math.floor(Math.random() * size) + 1;

export function formatDate(isoString) {
	const date = new Date(isoString);
	const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}
