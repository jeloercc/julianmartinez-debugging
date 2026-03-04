const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
// Strech goal Bug validate the guess is a number between 1 and 99 
  if (guess < 1 || guess > 99 || isNaN(guess)) {
  alert('Please enter a valid number between 1 and 99');
  return;
}
  attempts = attempts + 1;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = '';
    submitButton.disabled = true;
    guessInput.disabled = true;
// Bug 1 fixed: changed second "if" to "else" so only one block runs,removed
// (guess !== targetNumber)" to just "else" since it's the only remaining possibility.
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
// Bug 2 fixed: changed "tooLowMessage" to "tooHighMessage".
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
// Strech goal Bug added pluralization for "guess"
    let guessWord = (remainingAttempts === 1) ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;

//3 Bug fixed the original code had a typo with "====" instead of "===".
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
//4 Bug fixed: added "maxGuessesMessage.style.display = ''" to show the "max guesses reached" message,
// when the player runs out of attempts.
    maxGuessesMessage.style.display = '';
  }
}
  guessInput.value = ''

  resetButton.style.display = '';
}

function hideAllMessages() {
//5 bug fixed  changed <=  With <,when elementIndex reaches 5.
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}
//6 bug fixed changed "funtion" with function its the correct syntax 
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
//7 Bug fixed: changed "maxNumberOfAttempts = 0" to "attempts = 0" 
// maxNumberOfAttempts is a const (cannot be changed) and should always be 5.
  attempts = 0;

  // Enable the input and submit button
//8 Bug fixed: "disabeld" was a spelling error, corrected to "disabled".
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();