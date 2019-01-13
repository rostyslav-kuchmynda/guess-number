// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessInput = document.querySelector("#guess-input"),
      guessBtn = document.querySelector("#guess-btn"),
      message = document.querySelector(".message");

// Assign UI min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
})

// Add Event listener on Submit
guessBtn.addEventListener("click", function() {
    let guess = parseInt(guessInput.value);
    // Validating Input | isNaN() <=== checking if it's not a number
    if (isNaN(guess) || guess < min || guess > max ) {
        setMessage(`Please enter the number between ${min} and ${max}`, "red");
    }
    // Check if WON
    if (guess === winningNum) {
        gameOver(`You WON!!! The number is ${winningNum}`, true);
    } else {
        // Removing number of guesses
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver(`You Lost! Winning number was ${winningNum}`, false);
        } else {
            guessInput.style.borderColor = "red";
            guessInput.value = '';
            setMessage(`${guess} is WRONG! ${guessesLeft} guesses left!`, "red");
        }
    }
});

// Message func
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
};

// Game Over
function gameOver(msg, won) {
    let color;
    won === true ? color = "green" : color = "red";

    guessInput.disabled =  true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    // Reset game
    guessBtn.value = "Play again!";

    // Appending the class, += going to replace existing classes if there any
    guessBtn.className += "play-again";
}

// Generation Number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}