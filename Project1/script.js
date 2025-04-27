let secretNumber;
let attemptsLeft = 10;
let attemptsHistory = [];
let guessListElement;

function startGame() {
	secretNumber = Math.floor(Math.random() * 100) + 1;
	attemptsLeft = 10;
	attemptsHistory = [];
	updateAttemptsDisplay();
	guessListElement = document.getElementById('guessList');
	guessListElement.innerHTML = '';
	document.getElementById('restartBtn').style.display = 'none';
	enableInputAndButton();
}

function checkGuess() {
	const userGuessInput = document.getElementById('userGuess');
	const userGuess = parseInt(userGuessInput.value);

	if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
		alert('Please enter a valid number between 1 and 100.');
		return;
	}

	submitGuess(userGuess);
}

function submitGuess(userGuess) {
	attemptsLeft--;
	attemptsHistory.push(userGuess);
	updateAttemptsDisplay();
	updateGuessList();

	if (userGuess === secretNumber) {
		displayMessage(`Congratulations! You guessed the correct number: ${secretNumber}`, 'success');
		endGame();
	} else if (attemptsLeft === 0) {
		displayMessage(`Game over! The correct number was: ${secretNumber}`, 'failure');
		endGame();
	} else {
		const hint = userGuess < secretNumber ? 'Try a higher number.' : 'Try a lower number.';
		displayMessage(`Incorrect! ${hint}`, 'hint');
	}

	document.getElementById('userGuess').value = ''; // Reset the input box
}

function updateAttemptsDisplay() {
	document.getElementById('attempts').innerText = `Attempts left: ${attemptsLeft}`;
}

function updateGuessList() {
	guessListElement.innerHTML = '';
	const guessListItems = attemptsHistory.map(guess => `<span class="guess-item">${guess}</span>`).join('');
	guessListElement.innerHTML = `Your guesses: ${guessListItems}`;
}

function displayMessage(message, type) {
	const messageElement = document.getElementById('message');
	messageElement.innerText = message;
	messageElement.className = type;
}

function endGame() {
	disableInputAndButton();
	document.getElementById('restartBtn').style.display = 'block';
	document.getElementById('restartBtn').innerText = 'Restart Game';
}

function restartGame() {
	startGame();
	document.getElementById('restartBtn').style.display = 'none';
}

function disableInputAndButton() {
	document.getElementById('userGuess').disabled = true;
	document.getElementById('submitBtn').disabled = true;
}

function enableInputAndButton() {
	document.getElementById('userGuess').disabled = false;
	document.getElementById('submitBtn').disabled = false;
}

// Listen for "Enter" key press event
document.getElementById('userGuess').addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		checkGuess();
	}
});

// Start the game when the page loads
window.onload = startGame;
