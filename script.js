const questions = [
    { question: 'What does HTML stand for?', answers: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 },
    { question: 'What does CSS stand for?', answers: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets'], correct: 1 },
    { question: 'Which language is used for web apps?', answers: ['PHP', 'Python', 'JavaScript'], correct: 2 },
    { question: 'What does JSON stand for?', answers: ['JavaScript Object Notation', 'JavaScript Online Notation', 'JavaScript Object Native'], correct: 0 },
    { question: 'What does SQL stand for?', answers: ['Strong Question Language', 'Structured Query Language', 'Structured Question Language'], correct: 1 },
    { question: 'What does CPU stand for?', answers: ['Central Processing Unit', 'Central Process Unit', 'Computer Personal Unit'], correct: 0 },
    { question: 'What does GPU stand for?', answers: ['Graphics Performance Unit', 'Graphics Processing Unit', 'Graphical Performance Unit'], correct: 1 },
    { question: 'What is the correct syntax for referring to an external script called "script.js"?', answers: ['<script src="script.js">', '<script href="script.js">', '<script ref="script.js">'], correct: 0 },
    { question: 'How do you write "Hello World" in an alert box?', answers: ['msgBox("Hello World");', 'alertBox("Hello World");', 'alert("Hello World");'], correct: 2 },
    { question: 'How do you create a function in JavaScript?', answers: ['function myFunction()', 'function:myFunction()', 'function = myFunction()'], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

startGame();

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = 'Next';
    nextButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const buttons = answerButtonsElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true; // Disable buttons to prevent multiple clicks
        if (button.innerText === questions[currentQuestionIndex].answers[questions[currentQuestionIndex].correct]) {
            button.classList.add('correct-answer');
        } else if (button.innerText === questions[currentQuestionIndex].answers[index]) {
            button.classList.add('wrong-answer');
        }
    });

    setTimeout(() => {
        // Remove animation classes and proceed to the next question
        buttons.forEach(button => {
            button.classList.remove('correct-answer', 'wrong-answer');
            button.disabled = false;
        });

        if (index === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResults();
        }
    }, 1000); // Adjust the delay as needed
}

function showResults() {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', questions.length);
    window.location.href = 'results.html';
}

// Timer for navigating to results.html after 5 minutes
setTimeout(function() {
    window.location.href = "results.html";
}, 5 * 60 * 1000);
