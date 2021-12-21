$(document).ready(function () {
  var equation = $('#equation');
  var answerInput = $('#answer-input');
  var timerValue = $('#timer-value');
  var newGame = $('#new-game');
  var gameMode = $('#game-mode');
  var numberLimit = $('#number-limit');
  var currentScore = $('#current-score');
  var highScore = $('#high-score');
  var timer = null;
  var gameModeOperator = '+';
  var gameModeIsRandom = false;
  var numberLimitValue = 10;

  // Function to generate a random number
  var randomNumber = function (max, min) {
    max = ++max;
    var randomNum = Math.floor((Math.random() * max) + min);
    return randomNum;
  };

  // Function to randomize the operator
  var randomOperator = function (index) {
    switch (index) {
      case 1:
        gameModeOperator = '+';
        break;
      case 2:
        gameModeOperator = '-';
        break;
      case 3:
        gameModeOperator = '*';
        break;
      case 4:
        gameModeOperator = '/';
        break;
    }
  };

  // Function to generate a new equation string and answer
  var generateEquation = function (operator) {
    var question = '';
    var firstNumber = 0;
    var secondNumber = 0;
    var answer = 0;
    var tempNumber = 0;

    switch (operator) {
      case '+':
        firstNumber = randomNumber(numberLimitValue, 0);
        secondNumber = randomNumber(numberLimitValue, 0);
        answer = firstNumber + secondNumber;
        break;
      case '-':
        firstNumber = randomNumber(numberLimitValue, 0);
        secondNumber = randomNumber(numberLimitValue, 0);
        if (secondNumber > firstNumber) {
          tempNumber = secondNumber;
          secondNumber = firstNumber;
          firstNumber = tempNumber;
          answer = firstNumber - secondNumber;
        } else {
          answer = firstNumber - secondNumber;
        }
        break;
      case '*':
        firstNumber = randomNumber(numberLimitValue, 0);
        secondNumber = randomNumber(numberLimitValue, 0);
        answer = firstNumber * secondNumber;
        break;
      case '/':
        answer = randomNumber(numberLimitValue, 0);
        secondNumber = randomNumber(numberLimitValue, 0);
        firstNumber = secondNumber * answer;
        break;
    }

    question = firstNumber + ' ' + operator + ' ' + secondNumber;
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
    answerInput.blur();
    timerValue.text(10);
    updateHighScore();
    answerInput.attr('disabled', 'true');
    newGame.removeAttr('disabled');
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
      if (gameModeIsRandom) {
        randomOperator(randomNumber(4, 1));
      }
      equationAnswer = generateEquation(gameModeOperator);
      answerInput.val('');
    }
  });

  // Function listening for a change in game mode
  gameMode.change(function () {
    if (gameMode.val() === 'random') {
      gameModeIsRandom = true;
      randomOperator(randomNumber(4, 1));
    } else {
      gameModeIsRandom = false;
      gameModeOperator = gameMode.val();
    }
  });

  // Function listening for a change in number limit
  numberLimit.change(function () {
    numberLimitValue = numberLimit.val();
  });

  // Function to start a new game and enable the input field
  newGame.click(function () {
    answerInput.removeAttr('disabled');
    newGame.attr('disabled', 'true');
  });

  // Program initiation
  var equationAnswer = generateEquation(gameModeOperator, 0);
});