// ---------------------------------------------
// Array of Questions, Options, and Answers
// ---------------------------------------------
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperloop Machine Language",
      "None of these"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "float", "string"],
    answer: "var"
  }
];

// ---------------------------------------------
// Variables to Track Quiz State
// ---------------------------------------------
let currentQuestion = 0;  // Index of current question
let score = 0;            // User's score
let timeLeft = 10;        // Countdown per question
let timerInterval;        // Reference to setInterval
let shuffledQuestions = [];  // Holds randomized questions

// ---------------------------------------------
// Start the Quiz When Page Loads
// ---------------------------------------------
window.onload = startQuiz;

// ---------------------------------------------
// Shuffle and Load First Question
// ---------------------------------------------
function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

// ---------------------------------------------
// Load and Display Current Question and Options
// ---------------------------------------------
function loadQuestion() {
  // Reset timer and display
  clearInterval(timerInterval);
  timeLeft = 10;
  updateScoreAndTimer();

  const q = shuffledQuestions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  // Clear previous options
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Create buttons for each option
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option;
    btn.onclick = () => {
      checkAnswer(btn, q.answer);  // Check selected answer
      clearInterval(timerInterval); // Stop timer
    };
    optionsDiv.appendChild(btn);
  });

  // Start countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    updateScoreAndTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableOptions();
      document.getElementById("score").innerText = `Time's up! Score: ${score}`;
    }
  }, 1000);
}

// ---------------------------------------------
// Update Score and Timer Display
// ---------------------------------------------
function updateScoreAndTimer() {
  document.getElementById("score").innerText = `Score: ${score} | Time left: ${timeLeft}s`;
}

// ---------------------------------------------
// Disable All Option Buttons After Answered
// ---------------------------------------------
function disableOptions() {
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = true;
  });
}

// ---------------------------------------------
// Check If User Selected the Correct Answer
// ---------------------------------------------
function checkAnswer(button, correctAnswer) {
  disableOptions(); // Disable buttons after selection

  if (button.innerText === correctAnswer) {
    button.classList.add("correct"); // Green if correct
    score++;
  } else {
    button.classList.add("wrong");   // Red if wrong
  }

  updateScoreAndTimer(); // Update display
}

// ---------------------------------------------
// Move to Next Question or Show Final Result
// ---------------------------------------------
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion(); // Load next question
  } else {
    showFinalScreen(); // End quiz
  }
}

// ---------------------------------------------
// Show Final Result Screen
// ---------------------------------------------
function showFinalScreen() {
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your final score: ${score} / ${shuffledQuestions.length}</p>
    <button onclick="restartQuiz()">Restart Quiz</button>
  `;
}

// ---------------------------------------------
// Restart Quiz from Beginning
// ---------------------------------------------
function restartQuiz() {
  document.getElementById("quiz-container").innerHTML = `
    <h2 id="question">Loading question...</h2>
    <div id="options"></div>
    <button onclick="nextQuestion()" id="next-btn">Next</button>
    <p id="score">Score: 0 | Time left: 10s</p>
  `;
  startQuiz(); // Restart
}