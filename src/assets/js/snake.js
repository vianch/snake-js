import Board from "./board";
import { generateRandomNumber } from "./math.utils";
import {
	directions,
	defaultGridSize,
	defaultGameDelay,
	eventTypes,
	keyboardKeys,
	keyboardCodes,
	defaultPosition,
} from "./constants";

class SnakeGame extends Board {
	snakeDirection = directions.right;
	snakePositions = [];
	snakeHeadPosition = {};
	foodPosition = {};
	gameStarted = null;

	#gridSize = defaultGridSize;
	#gameInterval = null;
	#gameSpeedDelay = defaultGameDelay;
	#highScore = 0;

	constructor(snakePositions = defaultPosition) {
		super();
		this.snakePositions = [...snakePositions];
		this.foodPosition = this.#generateFoodPosition();
		this.gameStarted = false;
	}

	#checkCollision = () => {
		const collisionDetected = this.snakePositions
			.slice(1)
			.some(
				(segment) =>
					segment.x === this.snakeHeadPosition.x &&
					segment.y === this.snakeHeadPosition.y
			);

		if (
			collisionDetected ||
			this.snakeHeadPosition?.x < 1 ||
			this.snakeHeadPosition?.x > this.#gridSize ||
			this.snakeHeadPosition?.y < 1 ||
			this.snakeHeadPosition?.y > this.#gridSize
		) {
			this.endGame();
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
			this.snakePositions.forEach((segment) => {
				const snakeElement = Board.createGameElement("div", "snake");

				Board.setPosition(snakeElement, segment);
				this.appendElementToBoard(snakeElement);
			});
		}
	};

	#drawFood = () => {
		const foodElement = Board.createGameElement("div", "food");

		Board.setPosition(foodElement, this.foodPosition);
		this.appendElementToBoard(foodElement);
	};

	#generateFoodPosition = () => {
		const newPosition = {
			x: generateRandomNumber(this.#gridSize),
			y: generateRandomNumber(this.#gridSize),
		};

		const isPositionOccupied = this.snakePositions.some(
			(snakePosition) =>
				snakePosition.x === newPosition.x && snakePosition.y === newPosition.y
		);

		return isPositionOccupied ? this.generateFoodPosition() : newPosition;
	};

	#eatFoot = () => {
		if (
			this.snakeHeadPosition?.x === this.foodPosition?.x &&
			this.snakeHeadPosition?.y === this.foodPosition?.y
		) {
			clearInterval(this.#gameInterval);

			this.#increaseSnakeSpeed();
			this.#updateScore();
			this.foodPosition = this.#generateFoodPosition();
			this.#initializeGameInterval();
		} else {
			this.snakePositions.pop();
		}
	};

	#handlerKeyPress = (keyboardEvent) => {
		const keyboardKey = keyboardEvent?.key;
		const keyboardCode = keyboardEvent?.code;

		if (
			!this.gameStarted &&
			(keyboardCode === keyboardCodes.spaceBar ||
				keyboardKey === keyboardKeys.spaceBar)
		) {
			this.startGame();
		} else if (
			this.gameStarted &&
			(keyboardKey === keyboardKeys.escape ||
				keyboardCode === keyboardKeys.escape)
		) {
			this.endGame();
		} else {
			switch (keyboardKey) {
				case keyboardKeys.arrowUp:
					if (this.snakeDirection !== directions.down) {
						this.snakeDirection = directions.up;
					}

					break;

				case keyboardKeys.arrowDown:
					if (this.snakeDirection !== directions.up) {
						this.snakeDirection = directions.down;
					}

					break;

				case keyboardKeys.arrowLeft:
					if (this.snakeDirection !== directions.right) {
						this.snakeDirection = directions.left;
					}

					break;

				case keyboardKeys.arrowRight:
					if (this.snakeDirection !== directions.left) {
						this.snakeDirection = directions.right;
					}

					break;

				default:
					break;
			}
		}
	};

	listener = () => {
		document.addEventListener(eventTypes.keydown, this.#handlerKeyPress);
	};

	#increaseSnakeSpeed = () => {
		if (this.#gameSpeedDelay > 150) {
			this.#gameSpeedDelay -= 5;
		} else if (this.#gameSpeedDelay > 100) {
			this.#gameSpeedDelay -= 3;
		} else if (this.#gameSpeedDelay > 50) {
			this.#gameSpeedDelay -= 2;
		} else if (this.#gameSpeedDelay > 25) {
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

	#moveSnake = () => {
		this.snakeHeadPosition = { ...this.snakePositions[0] };

		switch (this.snakeDirection) {
			case directions.right:
				this.snakeHeadPosition.x += 1;
				break;

			case directions.left:
				this.snakeHeadPosition.x -= 1;
				break;

			case directions.up:
				this.snakeHeadPosition.y -= 1;
				break;

			case directions.down:
				this.snakeHeadPosition.y += 1;
				break;

			default:
				break;
		}

		this.snakePositions.unshift(this.snakeHeadPosition);
		this.#eatFoot();
	};

	startGame = () => {
		this.gameStarted = true;
		this.startBoard();
		this.#initializeGameInterval();
	};

	resetGame = () => {
		clearInterval(this.#gameInterval);
		this.gameStarted = false;
		this.endBoard();
	};

	endGame = () => {
		this.resetGame();
		this.#updateHighScore();
		this.snakePositions = [...defaultPosition];
		this.foodPosition = this.#generateFoodPosition();
		this.snakeDirection = directions.right;
		this.#gameSpeedDelay = defaultGameDelay;
		this.#updateScore();
	};

	#updateScore = () => {
		const currentScore = this.snakePositions.length - 1;

		this.scoreElement.textContent = currentScore?.toString()?.padStart(3, "0");
	};

	#updateHighScore = () => {
		const currentScore = this.snakePositions.length - 1;

		if (currentScore > this.#highScore) {
			this.#highScore = currentScore;
			this.highScoreElement.textContent = this.#highScore
				.toString()
				.padStart(3, "0");
		}
	};
}

export default SnakeGame;
