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

	constructor(snakePositions = defaultPosition) {
		super();
		this.snakePositions = [...snakePositions];
		this.foodPosition = this.#generateFoodPosition();
		this.gameStarted = false;

		document.addEventListener(eventTypes.keydown, this.#handlerKeyPress);
	}

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

	#generateFoodPosition = () => ({
		x: generateRandomNumber(this.#gridSize),
		y: generateRandomNumber(this.#gridSize),
	});

	#eatFoot = () => {
		if (
			this.snakeHeadPosition?.x === this.foodPosition?.x &&
			this.snakeHeadPosition?.y === this.foodPosition?.y
		) {
			this.foodPosition = this.#generateFoodPosition();

			clearInterval(this.#gameInterval);

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
					this.snakeDirection = directions.up;
					break;

				case keyboardKeys.arrowDown:
					this.snakeDirection = directions.down;
					break;

				case keyboardKeys.arrowLeft:
					this.snakeDirection = directions.left;
					break;

				case keyboardKeys.arrowRight:
					this.snakeDirection = directions.right;
					break;

				default:
					break;
			}
		}
	};

	#initializeGameInterval = () => {
		this.#gameInterval = setInterval(() => {
			this.#moveSnake();
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
		this.snakePositions = [...defaultPosition];
		this.foodPosition = this.#generateFoodPosition();
		this.snakeDirection = directions.right;
		this.#gameSpeedDelay = defaultGameDelay;
	};
}

export default SnakeGame;
