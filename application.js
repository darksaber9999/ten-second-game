$(document).ready(function () {
  var equation = $('#equation');
  var answerInput = $('#answer-input');
  var timerValue = $('#timer-value');
  var gameMode = $('#game-mode');
  var numberLimit = $('#number-limit');
  var currentScore = $('#current-score');
  var highScore = $('#high-score');
  var timer = null;

  // Function to generate a new equation string and answer
  var generateEquation = function (operator) {
    var question = '';
    var firstNumber = 0;
    var secondNumber = 0;
    var answer = 0;

    firstNumber = Math.floor(Math.random() * (11 - 0)) + 0;
    secondNumber = Math.floor(Math.random() * (11 - 0)) + 0;

    question = firstNumber + ' ' + operator + ' ' + secondNumber;
    answer = firstNumber + secondNumber;
    equation.text(question);

    return answer;
  };

  // Function for starting and keeping track of the timer
  var startTimer = function () {
    if (!timer) {
      currentScore.text(0);
      timer = setInterval(function () {
        var currentValue = timerValue.text();
        timerValue.text(--currentValue);
        if (timerValue.text() == -1) {
          stopTimer();
        }
      }, 1000); // Executed every 1000 milliseconds
    }
  };

  // Function to stop the timer and reset game
  var stopTimer = function () {
    window.clearInterval(timer);
    timer = null;
    timerValue.text(10);
    updateHighScore();
  };

  // Function to add a second to the current time for a correct guess
  var addSecond = function () {
    var currentTime = timerValue.text();
    timerValue.text(++currentTime);
  };

  // Function to add to the current score for a correct guess
  var addToScore = function () {
    var currentScoreValue = currentScore.text();
    currentScore.text(++currentScoreValue);
  };

  // Function to check and update the high score
  var updateHighScore = function () {
    var currentHighScoreValue = highScore.text();
    var potentialHighScoreValue = currentScore.text();
    if (potentialHighScoreValue > currentHighScoreValue) {
      highScore.text(potentialHighScoreValue);
    }
  };

  // Function to listen for user guess and compare it to equation answer
  answerInput.keyup(function (event) {
    startTimer();
    if (answerInput.val() == equationAnswer) {
      addSecond();
      addToScore();
      equationAnswer = generateEquation('+');
      answerInput.val('');
    }
  });

  // Program initiation
  var equationAnswer = generateEquation('+');
});