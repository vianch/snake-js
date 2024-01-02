class Board {
	// Define HTML elements
	#board = document.getElementById("game-board");
	#instructionsElement = document.getElementById("instructions-container");

	appendElementToBoard(element) {
		this.#board.appendChild(element);
	}

	clearBoard() {
		this.#board.innerHTML = "";
	}

	endBoard() {
		this.clearBoard();
		this.#instructionsElement.style.display = "flex";
		this.#board.style.display = "none";
	}

	startBoard() {
		this.#instructionsElement.style.display = "none";
		this.#board.style.display = "grid";
		this.clearBoard();
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
