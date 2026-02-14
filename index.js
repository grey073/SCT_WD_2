let startTime = 0;
let elapsedTime = 0;
let timer = null;

// Get elements
const display = document.getElementById("headings");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");

// Format time
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Update display
function updateDisplay() {
    display.innerText = formatTime(elapsedTime);
}

// Start
function startTimer() {
    if (timer !== null) return;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);

    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
    lapBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
}

// Stop
function stopTimer() {
    clearInterval(timer);
    timer = null;

    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
}

// Reset
function resetTimer() {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = "";

    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
    startBtn.style.display = "inline-block";
}

// Lap
function addLap() {
    if (timer === null) return;

    const li = document.createElement("li");
    li.innerText = formatTime(elapsedTime);
    lapsList.appendChild(li);
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
