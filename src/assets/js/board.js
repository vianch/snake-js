class Board {
	// Define HTML elements
	scoreElement = document.getElementById("score");
	highScoreElement = document.getElementById("high-score");
	#board = document.getElementById("game-board");
	#instructionsElement = document.getElementById("instructions-container");
	#controlsElement = document.getElementById("control-container");
	startButton = document.getElementById("start-button");
	arrows = {
		up: document.getElementById("arrow-up"),
		down: document.getElementById("arrow-down"),
		left: document.getElementById("arrow-left"),
		right: document.getElementById("arrow-right"),
	};

	appendElementToBoard(element) {
		this.#board.appendChild(element);
	}

	appendElementsToBoard = (elements) => {
		elements.forEach((element) => {
			this.appendElementToBoard(element);
		});
	};

	clearBoard() {
		this.#board.innerHTML = "";
	}

	blinkBoard() {
		this.#board.classList.add("snake-die");
	}

	async endBoard() {
		this.blinkBoard();

		return new Promise((resolve) => {
			setTimeout(() => {
				this.clearBoard();
				this.#instructionsElement.style.display = "flex";
				this.#board.style.display = "none";
				this.#board.classList.remove("snake-die");
				this.endControls();

				resolve();
			}, 1400);
		});
	}

	startBoard() {
		this.#instructionsElement.style.display = "none";
		this.#board.style.display = "grid";
		this.clearBoard();
		this.startControls();
	}

	startControls() {
		this.startButton.style.display = "none";
		this.#controlsElement.style.display = "inline-block";
	}

	endControls() {
		this.startButton.style.display = "inline-block";
		this.#controlsElement.style.display = "none";
	}

	static createGameElement = (elementType, className) => {
		const snakeElement = document.createElement(elementType);

		snakeElement.classList.add(className);

		return snakeElement;
	};

	static setPosition = (element, segment) => {
		const snakeElement = element;

		snakeElement.style.gridRowStart = segment.y;
		snakeElement.style.gridColumnStart = segment.x;
	};
}

export default Board;
