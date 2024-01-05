import Board from "./board";
import Database from "./database";
import { generateRandomNumber } from "./utils";
import {
	directions,
	defaultGridSize,
	defaultGameDelay,
	eventTypes,
	keyboardKeys,
	defaultPosition,
	supaBasePublic,
	dbTables,
	dbColumns,
	defaultFoodDelay,
} from "./constants";

/**
 * Represents a Snake Game.
 * @extends Board
 */
class SnakeGame extends Board {
	/**
	 * The direction of the snake.
	 * @type {string}
	 */
	snakeDirection = directions.right;
	previousSnakeDirection = directions.right;

	/**
	 * The positions of the snake segments (THE SNAKE!!!! ------0).
	 * @type {Array}
	 */
	snakePositions = [];

	/**
	 * The position of the snake's head.
	 * @type {Object}
	 */
	snakeHeadPosition = {};

	/**
	 * The position of the food.
	 * @type {Object}
	 */
	foodPosition = {};

	/**
	 * Indicates if the game has started.
	 * @type {boolean}
	 */
	gameStarted = false;

	#database = null;
	/**
	 * The size of the grid.
	 * @private
	 * @type {number}
	 */
	#gridSize = defaultGridSize;

	/**
	 * The interval ID for the game loop.
	 * @private
	 * @type {number}
	 */
	#gameInterval = null;
	#foodInterval = null;
	/**
	 * The delay between game updates.
	 * @private
	 * @type {number}
	 */
	#gameSpeedDelay = defaultGameDelay;
	#foodDelay = defaultFoodDelay;

	/**
	 * The high score of the game.
	 * @private
	 * @type {number}
	 */
	#highScore = 0;
	#isPressingKey = false;

	/**
	 * Creates a new SnakeGame instance.
	 * @param {Array} snakePositions - Override the initial positions of the snake segments.
	 */
	constructor(snakePositions = defaultPosition) {
		super();
		this.snakePositions = [...snakePositions];
		this.foodPosition = this.#generateFoodPosition();
		this.#database = new Database(supaBasePublic);
		this.#loadHighScores();
	}

	/**
	 * Checks for collision with the snake's head and the game boundaries or other segments.
	 * Ends the game if collision is detected.
	 * @private
	 */
	#checkCollision = () => {
		const { x, y } = this.snakeHeadPosition;
		const isCollisionDetected =
			this.snakePositions
				.slice(1)
				.some((segment) => segment.x === x && segment.y === y) ||
			x < 1 ||
			x > this.#gridSize ||
			y < 1 ||
			y > this.#gridSize;

		if (isCollisionDetected) {
			this.endGame().then(() => null);
		}
	};

	draw = () => {
		if (this.gameStarted) {
			this.clearBoard();
			this.#drawSnake();
			this.#drawFood();
		}
	};

	#drawSnake = () => {
		if (this.gameStarted) {
			const snakeElements = this.snakePositions.map((segment) => {
				const snakeElement = Board.createGameElement("div", "snake");

				Board.setPosition(snakeElement, segment);

				return snakeElement;
			});

			this.appendElementsToBoard(snakeElements);
		}
	};

	#drawFood = () => {
		const foodElement = Board.createGameElement("div", "food");

		Board.setPosition(foodElement, this.foodPosition);
		this.appendElementToBoard(foodElement);
	};

	/**
	 * Generates a random position for the food.
	 * if the new position is occupied by the snake, generate a new position.
	 * @private
	 * @returns {Object} - The generated food position.
	 */
	#generateFoodPosition = () => {
		const newPosition = {
			x: generateRandomNumber(this.#gridSize),
			y: generateRandomNumber(this.#gridSize),
		};

		const isPositionOccupied = this.snakePositions.some(
			(snakePosition) =>
				snakePosition.x === newPosition.x && snakePosition.y === newPosition.y
		);

		return isPositionOccupied ? this.#generateFoodPosition() : newPosition;
	};

	/**
	 * Handles the logic when the snake eats the food.
	 * if the foot has eaten, increase the snake speed, update the score, and generate a new food position.
	 * if the food has not eaten, remove the last segment of the snake.
	 * @private
	 */
	#eatFood = () => {
		const { x, y } = this.snakeHeadPosition;
		const isFoodEaten = x === this.foodPosition.x && y === this.foodPosition.y;

		if (isFoodEaten) {
			clearInterval(this.#gameInterval);
			clearInterval(this.#foodInterval);
			this.#increaseSnakeSpeed();
			this.#updateScore();
			this.foodPosition = this.#generateFoodPosition();
			this.#initializeGameInterval();
			this.#initializeFoodInterval();
		} else {
			this.snakePositions.pop();
		}
	};

	/**
	 * Handles the key press event.
	 * if the user press the spacebar start the snake game
	 * if the user press the escape key end the game
	 * other wise liste for the arrow keys
	 * @param {KeyboardEvent} keyboardEvent - The keyboard event object.
	 */
	#handleKeyPress = (keyboardEvent) => {
		const { key, code } = keyboardEvent;

		if (!this.#isPressingKey) {
			this.#isPressingKey = true;

			if (!this.gameStarted) {
				this.startGame();
			} else if (
				this.gameStarted &&
				(key === keyboardKeys.escape || code === keyboardKeys.escape)
			) {
				this.endGame().then(() => null);
			} else {
				switch (key) {
					case keyboardKeys.arrowUp:
						if (
							this.snakeDirection !== directions.down &&
							this.previousSnakeDirection !== directions.down &&
							this.previousSnakeDirection !== directions.up &&
							this.snakeDirection !== directions.up
						) {
							this.snakeDirection = directions.up;
						}

						break;

					case keyboardKeys.arrowDown:
						if (
							this.previousSnakeDirection !== directions.down &&
							this.previousSnakeDirection !== directions.up &&
							this.snakeDirection !== directions.down &&
							this.snakeDirection !== directions.up
						) {
							this.snakeDirection = directions.down;
						}

						break;

					case keyboardKeys.arrowLeft:
						if (
							this.previousSnakeDirection !== directions.right &&
							this.previousSnakeDirection !== directions.left &&
							this.snakeDirection !== directions.right &&
							this.snakeDirection !== directions.left
						) {
							this.snakeDirection = directions.left;
						}

						break;

					case keyboardKeys.arrowRight:
						if (
							this.previousSnakeDirection !== directions.right &&
							this.previousSnakeDirection !== directions.left &&
							this.snakeDirection !== directions.right &&
							this.snakeDirection !== directions.left
						) {
							this.snakeDirection = directions.right;
						}

						break;

					default:
						break;
				}
			}

			this.#isPressingKey = false;
		}
	};

	/**
	 * Adds the keydown event listener to the document to start the game
	 */
	listener = () => {
		document.addEventListener(eventTypes.keydown, this.#handleKeyPress, false);
		this.arrows.up.addEventListener(eventTypes.click, () =>
			this.#handleKeyPress({ key: keyboardKeys.arrowUp })
		);
		this.arrows.down.addEventListener(eventTypes.click, () =>
			this.#handleKeyPress({ key: keyboardKeys.arrowDown })
		);
		this.arrows.left.addEventListener(eventTypes.click, () =>
			this.#handleKeyPress({ key: keyboardKeys.arrowLeft })
		);
		this.arrows.right.addEventListener(eventTypes.click, () =>
			this.#handleKeyPress({ key: keyboardKeys.arrowRight })
		);
	};

	#loadHighScores = () => {
		this.#database
			.fetchData(dbTables.highScores, dbColumns.score)
			.then((response) => {
				this.#highScore = response[0].score;
				this.#updateHighScoreText();
			});
	};

	#increaseSnakeSpeed = () => {
		if (this.#gameSpeedDelay > 150) {
			this.#gameSpeedDelay -= 5;
			this.#foodDelay -= 200;
		} else if (this.#gameSpeedDelay > 100) {
			this.#gameSpeedDelay -= 3;
			this.#foodDelay -= 100;
		} else if (this.#gameSpeedDelay > 50) {
			this.#gameSpeedDelay -= 2;
			this.#foodDelay -= 50;
		} else if (this.#gameSpeedDelay > 25) {
			this.#foodDelay -= 25;
			this.#gameSpeedDelay -= 1;
		}
	};

	#initializeGameInterval = () => {
		this.#gameInterval = setInterval(() => {
			this.#moveSnake();
			this.#checkCollision();
			this.draw();
		}, this.#gameSpeedDelay);
	};

	#initializeFoodInterval = () => {
		this.#foodInterval = setInterval(() => {
			this.foodPosition = this.#generateFoodPosition();
		}, this.#foodDelay);
	};

	/**
	 * Moves the snake based on the current direction.
	 * @private
	 */
	#moveSnake = () => {
		this.snakeHeadPosition = { ...this.snakePositions[0] };

		switch (this.snakeDirection) {
			case directions.right:
				this.snakeHeadPosition.x += 1;
				this.previousSnakeDirection = directions.right;
				break;

			case directions.left:
				this.snakeHeadPosition.x -= 1;
				this.previousSnakeDirection = directions.left;
				break;

			case directions.up:
				this.snakeHeadPosition.y -= 1;
				this.previousSnakeDirection = directions.up;
				break;

			case directions.down:
				this.snakeHeadPosition.y += 1;
				this.previousSnakeDirection = directions.down;
				break;

			default:
				break;
		}

		this.snakePositions.unshift(this.snakeHeadPosition);
		this.#eatFood();
	};

	startGame = () => {
		this.gameStarted = true;
		this.startBoard();
		this.#initializeGameInterval();
		this.#initializeFoodInterval();
	};

	resetGame = async () => {
		clearInterval(this.#gameInterval);
		clearInterval(this.#foodInterval);
		this.gameStarted = false;
		await this.endBoard();
	};

	endGame = async () => {
		await this.resetGame();
		this.#updateHighScore();
		this.snakePositions = [...defaultPosition];
		this.foodPosition = this.#generateFoodPosition();
		this.snakeDirection = directions.right;
		this.#gameSpeedDelay = defaultGameDelay;
		this.#updateScore();
	};

	#saveHighScore = async () => {
		await this.#database.saveData(
			dbTables.highScores,
			dbColumns.score,
			this.#highScore
		);
	};

	/**
	 * Updates the current score on the game board.
	 * @private
	 */
	#updateScore = () => {
		const currentScore = this.snakePositions.length - 1;

		this.scoreElement.textContent = currentScore.toString().padStart(3, "0");
	};

	/**
	 * Updates the high score on the game board.
	 * @private
	 */
	#updateHighScore = () => {
		const currentScore = this.snakePositions.length - 1;

		if (currentScore > this.#highScore) {
			this.#highScore = currentScore;
			this.#updateHighScoreText();
			this.#saveHighScore().then(() => null);
		}
	};

	#updateHighScoreText = () => {
		this.highScoreElement.textContent = this.#highScore
			.toString()
			.padStart(3, "0");
	};
}

export default SnakeGame;
