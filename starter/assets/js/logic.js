 // DOM elements
 const startScreen = document.getElementById("start-screen");
 const startBtn = document.getElementById("start");
 const questionsScreen = document.getElementById("questions");
 const endScreen = document.getElementById("end-screen");
 const questionTitle = document.getElementById("question-title");
 const choices = document.getElementById("choices");
 const feedback = document.getElementById("feedback");
 const timeEl = document.getElementById("time");
 const initialsInput = document.getElementById("initials");
 const submitBtn = document.getElementById("submit");
//  const finalScoreEl = document.getElementById("highscores");

 // keeping track of which question we're on
var questionIndex = 0;

var quizTime = 30;

var score = 0;

 // Timer function
 function startTimer() {
  //  let timeLeft = quizTime;
   const timer = setInterval(() => {
    //  timeLeft--;
     quizTime--;
    //  timeEl.textContent = timeLeft;
     timeEl.textContent = quizTime;

    // If time runs out, end the quiz
    if (quizTime <= 0) {
      clearInterval(timer);
      // clearInterval(startTimer);
      endQuiz();
      }
      }, 1000);
      }


        // Function to show the next question
  function showQuestion() {
    // If there are no more questions, end the quiz
    if (questionIndex >= questions.length) {
      endQuiz();
      return;
    }

    // Display the current question title
    questionTitle.textContent = questions[questionIndex].question;
    

    // Remove any existing choices from previous question
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // Display the current question's choices
    questions[questionIndex].choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice");
      button.addEventListener("click", checkAnswer);
      choices.appendChild(button);
    });
  }

  // Function to check if the selected answer is correct
  function checkAnswer(e) {
    const selectedChoice = e.target;
    const correctAnswer = questions[questionIndex].answer;

    // If the selected choice is correct, show success feedback
    if (selectedChoice.textContent === correctAnswer) {
      feedback.textContent = "Correct!";
      feedback.classList.add("success");
      feedback.classList.remove("error");
      score+=10
    }
    // If the selected choice is incorrect, show error feedback and penalize time
    else {
      feedback.textContent = "Wrong!";
      feedback.classList.add("error");
      feedback.classList.remove("success");
      quizTime -= 10;
      timeEl.textContent = quizTime;
    }

    // Show the feedback and move on to the next question
    feedback.classList.remove("hide");
    questionIndex++;
    setTimeout(() => {
      feedback.classList.add("hide");
      showQuestion();
    }, feedback.textContent);
  }

  // Function to end the quiz and show the final score screen
  function endQuiz() {
    // clearInterval(timer);
    clearInterval(startTimer())
    startScreen.classList.add("hide");
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    // finalScoreEl.textContent = score;
    // finalScoreEl.textContent = saveScore;
  }

  // Function to save the score to local storage
  function saveScore() {
    const initials = initialsInput.value.trim();
    if (!initials) return;

    // var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    // localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
    // return hs;
  }

  // Event listener to start the quiz
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    showQuestion();
    startTimer();
  });

  // Event listener to submit the score
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveScore();
  });