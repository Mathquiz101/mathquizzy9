const questions = [
    {
        question: "In a right triangle, what is the sine of an angle θ defined as?",
        options: [
            "Opposite / Hypotenuse",
            "Adjacent / Hypotenuse",
            "Opposite / Adjacent",
            "Adjacent / Opposite"
        ],
        correct: 0
    },
    {
        question: "In a right triangle, what is the cosine of an angle θ defined as?",
        options: [
            "Adjacent / Hypotenuse",
            "Opposite / Hypotenuse",
            "Opposite / Adjacent",
            "Adjacent / Opposite"
        ],
        correct: 0
    },
    {
        question: "In a right triangle, what is the tangent of an angle θ defined as?",
        options: [
            "Opposite / Adjacent",
            "Opposite / Hypotenuse",
            "Adjacent / Hypotenuse",
            "Hypotenuse / Adjacent"
        ],
        correct: 0
    },
    {
        question: "If sin(θ) = 3/5 in a right triangle, what is cos(θ)?",
        options: ["4/5", "3/5", "5/3", "5/4"],
        correct: 0
    },
    {
        question: "If tan(θ) = 1, what is the value of θ in degrees?",
        options: ["45°", "30°", "60°", "90°"],
        correct: 0
    },
    {
        question: "In a 30°-60°-90° triangle, what is the ratio of the sides opposite 30° and 60°?",
        options: ["1:√3", "√3:1", "1:2", "2:1"],
        correct: 0
    },
    {
        question: "If cos(θ) = 5/13 in a right triangle, what is sin(θ)?",
        options: ["12/13", "5/12", "13/12", "5/13"],
        correct: 0
    },
    {
        question: "What is the sine of 90°?",
        options: ["1", "0", "-1", "Undefined"],
        correct: 0
    },
    {
        question: "What is the value of tan(0°)?",
        options: ["0", "1", "Undefined", "Infinity"],
        correct: 0
    },
    {
        question: "In a right triangle, if the hypotenuse is 10 and the side adjacent to θ is 6, what is cos(θ)?",
        options: ["0.6", "0.8", "0.5", "0.75"],
        correct: 0
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let quizEnded = false;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.querySelector('.timer');
const progressBar = document.querySelector('.progress');
const questionNumber = document.querySelector('.question-number');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
    startTimer();
}

function startTimer() {
    timeLeft = 60;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft/60) * 100}%`;
        
        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectIncorrect();
        }
    }, 1000);
}

function autoSelectIncorrect() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.style.pointerEvents = 'none');
    options[questions[currentQuestion].correct].classList.add('correct');
    nextBtn.classList.remove('hide');
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    progressBar.style.width = '100%';
}

function selectOption(index) {
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    
    if (index === questions[currentQuestion].correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[questions[currentQuestion].correct].classList.add('correct');
    }
    
    nextBtn.classList.remove('hide');
    options.forEach(option => option.style.pointerEvents = 'none');
}

function nextQuestion() {
    currentQuestion++;
    nextBtn.classList.add('hide');
    
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizEnded = true;
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    const resultEl = document.querySelector('.result');
    const percentage = (score / questions.length) * 100;
    
    resultEl.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score} out of ${questions.length}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Performance Rating: ${getPerformanceRating(percentage)}</p>
    `;

    // Show next level link if score is above 50%
    if (percentage > 50) {
        const nextLevelContainer = document.getElementById('next-level-container');
        const nextLevelLink = document.getElementById('next-level-link');
        const link = 'https://waecmathsuccess.github.io/mathlevel10/';
        
        nextLevelLink.href = link;
        nextLevelLink.textContent = link;
        nextLevelContainer.classList.remove('hide');
        
        // Add celebration animation
        nextLevelContainer.classList.add('celebration');
        setTimeout(() => {
            nextLevelContainer.classList.remove('celebration');
        }, 1000);
    }
}

function getPerformanceRating(percentage) {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Keep Practicing! 📚";
    return "Need More Practice 💪";
}

function copyLink() {
    const link = document.getElementById('next-level-link').href;
    navigator.clipboard.writeText(link).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
            copyBtn.style.backgroundColor = '#2ecc71';
        }, 2000);
    });
}
