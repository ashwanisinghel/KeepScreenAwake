// Timer Tool
class Timer {
    constructor() {
        this.interval = null;
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.reset();
    }

    start() {
        const hours = parseInt(document.getElementById('timerHours').value) || 0;
        const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
        const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
        
        if (this.remainingSeconds === 0) {
            this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
            this.remainingSeconds = this.totalSeconds;
        }
        
        if (this.remainingSeconds <= 0) return;
        
        this.interval = setInterval(() => this.update(), 1000);
        
        document.getElementById('timerStart').disabled = true;
        document.getElementById('timerPause').disabled = false;
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
        
        document.getElementById('timerStart').disabled = false;
        document.getElementById('timerPause').disabled = true;
    }

    reset() {
        clearInterval(this.interval);
        this.interval = null;
        this.remainingSeconds = 0;
        
        const hours = parseInt(document.getElementById('timerHours').value) || 0;
        const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
        const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
        
        this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
        this.remainingSeconds = this.totalSeconds;
        
        this.updateDisplay();
        this.updateProgress();
        
        document.getElementById('timerStart').disabled = false;
        document.getElementById('timerPause').disabled = true;
    }

    update() {
        this.remainingSeconds--;
        this.updateDisplay();
        this.updateProgress();
        
        if (this.remainingSeconds <= 0) {
            clearInterval(this.interval);
            this.interval = null;
            document.getElementById('timerStart').disabled = false;
            document.getElementById('timerPause').disabled = true;
            
            // Timer finished
            alert('Timer finished!');
        }
    }

    updateDisplay() {
        const hours = Math.floor(this.remainingSeconds / 3600);
        const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
        const seconds = this.remainingSeconds % 60;
        
        let display = '';
        if (hours > 0) {
            display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        document.getElementById('timerDisplay').textContent = display;
    }

    updateProgress() {
        if (this.totalSeconds === 0) return;
        const progress = ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100;
        document.getElementById('timerProgress').style.width = `${progress}%`;
    }

    setupEventListeners() {
        document.getElementById('timerHours').addEventListener('input', () => this.reset());
        document.getElementById('timerMinutes').addEventListener('input', () => this.reset());
        document.getElementById('timerSeconds').addEventListener('input', () => this.reset());
    }
}

// Global functions for backward compatibility
function startTimer() {
    window.timer.start();
}

function pauseTimer() {
    window.timer.pause();
}

function resetTimer() {
    window.timer.reset();
}

// Initialize timer
window.timer = new Timer();