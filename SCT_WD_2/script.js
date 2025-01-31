let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let timeDisplay = document.getElementById('time');
let lapList = document.getElementById('lapList');

let running = false;
let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let lapTimes = [];
let startTime = 0; // Track start time

function formatTime(ms) {
    let millis = ms % 1000;
    let totalSeconds = Math.floor(ms / 1000);
    let sec = totalSeconds % 60;
    let min = Math.floor(totalSeconds / 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}:${millis < 100 ? '0' + (millis < 10 ? '0' + millis : millis) : millis}`;
}

function startStopwatch() {
    startTime = Date.now() - (minutes * 60000 + seconds * 1000 + milliseconds); // Adjust start time for more accuracy
    timer = setInterval(() => {
        let elapsed = Date.now() - startTime;
        milliseconds = elapsed % 1000;
        let totalSeconds = Math.floor(elapsed / 1000);
        seconds = totalSeconds % 60;
        minutes = Math.floor(totalSeconds / 60);

        timeDisplay.textContent = formatTime(elapsed);
    }, 10);
}

function stopStopwatch() {
    clearInterval(timer);
}

function toggleStartStop() {
    if (running) {
        stopStopwatch();
        startStopBtn.textContent = 'Start';
    } else {
        startStopwatch();
        startStopBtn.textContent = 'Pause';
    }
    running = !running;
}

function resetStopwatch() {
    stopStopwatch();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapTimes = [];
    startTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    running = false;
}

function recordLap() {
    if (running) {
        // Calculate elapsed time since stopwatch started
        let currentLapTime = Date.now() - startTime;

        // Push lap time to the lapTimes array
        lapTimes.push(currentLapTime);

        // Display current lap time and time difference from the previous lap
        let lapItem = document.createElement('li');
        let lapNumber = lapTimes.length;
        let lapTime = formatTime(currentLapTime);

        let lastLapTime = lapTimes[lapNumber - 2] ? formatTime(currentLapTime - lapTimes[lapNumber - 2]) : 'N/A'; // For the first lap, there's no difference

        lapItem.textContent = `Lap ${lapNumber}: ${lapTime} (Difference from last lap: ${lastLapTime})`;
        lapList.appendChild(lapItem);
    }
}

// Event Listeners
startStopBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
