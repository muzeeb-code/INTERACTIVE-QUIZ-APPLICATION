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
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').innerText = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.classList.add('option-btn');
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(button, correctAnswer) {
  const allButtons = document.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (button.innerText === correctAnswer) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
  }

  document.getElementById('score').innerText = `Score: ${score}`;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.querySelector('.quiz-container').innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your score: ${score}/${questions.length}</p>
    `;
  }
}

window.onload = loadQuestion;;