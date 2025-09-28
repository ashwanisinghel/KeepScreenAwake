// Stopwatch Tool
class Stopwatch {
    constructor() {
        this.interval = null;
        this.startTime = 0;
        this.elapsed = 0;
        this.lapCounter = 1;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    start() {
        this.startTime = Date.now() - this.elapsed;
        this.interval = setInterval(() => this.update(), 10);
        
        document.getElementById('stopwatchStart').disabled = true;
        document.getElementById('stopwatchStop').disabled = false;
        document.getElementById('stopwatchLap').disabled = false;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        
        document.getElementById('stopwatchStart').disabled = false;
        document.getElementById('stopwatchStop').disabled = true;
        document.getElementById('stopwatchLap').disabled = true;
    }

    reset() {
        clearInterval(this.interval);
        this.interval = null;
        this.elapsed = 0;
        this.lapCounter = 1;
        
        document.getElementById('stopwatchDisplay').textContent = '00:00:00.000';
        document.getElementById('lapTimes').innerHTML = '';
        document.getElementById('stopwatchStart').disabled = false;
        document.getElementById('stopwatchStop').disabled = true;
        document.getElementById('stopwatchLap').disabled = true;
    }

    update() {
        this.elapsed = Date.now() - this.startTime;
        const time = this.formatTime(this.elapsed);
        document.getElementById('stopwatchDisplay').textContent = time;
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }

    addLap() {
        const lapTime = this.formatTime(this.elapsed);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `<span>Lap ${this.lapCounter}</span><span>${lapTime}</span>`;
        document.getElementById('lapTimes').appendChild(lapElement);
        this.lapCounter++;
    }

    setupEventListeners() {
        // Event listeners are handled by global functions for backward compatibility
    }
}

// Global functions for backward compatibility
function startStopwatch() {
    window.stopwatch.start();
}

function stopStopwatch() {
    window.stopwatch.stop();
}

function resetStopwatch() {
    window.stopwatch.reset();
}

function addLap() {
    window.stopwatch.addLap();
}

// Initialize stopwatch
window.stopwatch = new Stopwatch();