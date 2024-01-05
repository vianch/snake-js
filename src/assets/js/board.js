import { formatDate } from "./utils";

class Board {
	// Define HTML elements
	#board = document.getElementById("game-board");
	#controlsElement = document.getElementById("control-container");
	#instructionsElement = document.getElementById("instructions-container");
	#scoreTable = document.getElementById("score-table");
	highScoreElement = document.getElementById("high-score");
	modal = document.getElementById("modal");
	scoreElement = document.getElementById("score");
	seeScoresElement = document.getElementById("see-scores");
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

	blinkBoard() {
		this.#board.classList.add("snake-die");
	}

	clearBoard() {
		this.#board.innerHTML = "";
	}

	endControls() {
		this.startButton.style.display = "flex";
		this.#controlsElement.style.display = "none";
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

	populateScores = (scores) => {
		if (scores) {
			this.#scoreTable.innerHTML = "";
			scores.forEach((score, index) => {
				this.#scoreTable.appendChild(Board.createScoreEntry(score, index));
			});
		}
	};

	showScoreModal = () => {
		this.modal.style.display = "flex";
	};

	hideScoreModal = () => {
		this.modal.style.display = "none";
	};

	static createGameElement = (elementType, className) => {
		const snakeElement = document.createElement(elementType);

		snakeElement.classList.add(className);

		return snakeElement;
	};

	static createScoreEntry = (scoreData, index) => {
		const entry = document.createElement("div");
		const positionDiv = document.createElement("div");
		const dateDiv = document.createElement("div");
		const scoreDiv = document.createElement("div");

		entry.className = "score-entry";
		positionDiv.className = "position";
		positionDiv.textContent = index + 1;
		dateDiv.className = "date";
		dateDiv.textContent = formatDate(scoreData.created_at);
		scoreDiv.className = "score";
		scoreDiv.textContent = scoreData.score;

		entry.appendChild(positionDiv);
		entry.appendChild(dateDiv);
		entry.appendChild(scoreDiv);

		return entry;
	};

	static setPosition = (element, segment) => {
		const snakeElement = element;

		snakeElement.style.gridRowStart = segment.y;
		snakeElement.style.gridColumnStart = segment.x;
	};
}

export default Board;
