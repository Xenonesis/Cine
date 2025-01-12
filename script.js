// Select elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const nextBtn = document.querySelector(".next_btn");
const timerElement = document.getElementById("timer");
const timeLine = document.getElementById("time_line");

// Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeRemaining = 30;

// Start Quiz
startBtn.addEventListener("click", () => {
    infoBox.style.display = "block";
    document.querySelector(".start_btn").style.display = "none";
});

// Continue Quiz
document.querySelector(".restart").addEventListener("click", () => {
    infoBox.style.display = "none";
    quizBox.style.display = "block";
    showQuestion(currentQuestionIndex);
    startTimer();
});

// Exit Quiz
document.querySelector(".quit").addEventListener("click", () => {
    location.reload();
});

// Show Question
function showQuestion(index) {
    const questionText = document.querySelector(".que_text");
    const currentQue = document.getElementById("current_que");

    questionText.innerHTML = `<span>${questions[index].question}</span>`;
    currentQue.innerText = index + 1;

    // Load options
    optionList.innerHTML = "";
    questions[index].options.forEach((option, i) => {
        const optionHTML = `<div class="option" onclick="selectOption(${i})">${option}</div>`;
        optionList.insertAdjacentHTML("beforeend", optionHTML);
    });
}

// Select Option
function selectOption(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    nextBtn.style.display = "block";
}

// Next Question
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        nextBtn.style.display = "none";
        resetTimer();
    } else {
        clearInterval(timer);
        showResults();
    }
});

// Timer Functions
function startTimer() {
    timeRemaining = 30;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `${timeRemaining}s`;
        timeLine.style.width = `${((30 - timeRemaining) / 30) * 100}%`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextBtn.click();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// Show Results
function showResults() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    const resultText = document.querySelector(".score_text");
    const preferredGenres = userAnswers.map((answerIndex, i) => questions[i].options[answerIndex]);
    resultText.innerHTML = `<p>Your preferences: <strong>${preferredGenres.join(", ")}</strong></p>`;
}
