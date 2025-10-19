let timer;
let totalTime = 0;
let isRunning = false;
let isStudyMode = true;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const totalDisplay = document.getElementById("total");
const alarmSound = document.getElementById("alarm");
const modeDisplay = document.getElementById("mode");
const studyInput = document.getElementById("studyTime");
const breakInput = document.getElementById("breakTime");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alarmSound.play();
                
                if (isStudyMode) {
                    totalTime += Number(studyInput.value);
                    totalDisplay.textContent = totalTime;
                    isStudyMode = false;
                    timeLeft = Number(breakInput.value) * 60;
                    modeDisplay.textContent = "Pauza ⏸️";
                } else {
                    isStudyMode = true;
                    timeLeft = Number(studyInput.value) * 60;
                    modeDisplay.textContent = "Učenje 📚";
                }
                updateDisplay();
                startTimer();
            }
        }, 1000);
    }
}

document.getElementById("start").addEventListener("click", () => {
    if (!isRunning) {
        if (!timeLeft) {
            timeLeft = Number(studyInput.value) * 60;
        }
        startTimer();
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    isStudyMode = true;
    modeDisplay.textContent = "Učenje 📚";
    timeLeft = Number(studyInput.value) * 60;
    updateDisplay();
});

timeLeft = Number(studyInput.value) * 60;
updateDisplay();