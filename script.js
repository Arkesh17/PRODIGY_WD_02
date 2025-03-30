let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

const display = document.querySelector('.display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');
const progressBar = document.querySelector('.progress');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);
    let ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
    updateProgressBar();
    updateClock();
}

function updateProgressBar() {
    const progress = (elapsedTime % 60000) / 60000; 
    progressBar.style.width = `${progress * 100}%`;
}

function updateClock() {
   
    const hours = Math.floor(elapsedTime / 3600000) % 12;
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    
    const hourDeg = (hours * 30) + (minutes * 0.5); 
    const minuteDeg = (minutes * 6) + (seconds * 0.1); 
    const secondDeg = seconds * 6; 

    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        startPauseButton.textContent = 'Pause';
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    startPauseButton.textContent = 'Start';
    lapTimesList.innerHTML = '';
    lapCount = 1;
    progressBar.style.width = '0%';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
        lapTimesList.prepend(lapTime); // Add new lap to the top of the list
        lapCount++;
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);