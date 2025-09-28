// Duration Calculator
class DurationCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    calculate() {
        const startDateTime = document.getElementById('startDateTime').value;
        const endDateTime = document.getElementById('endDateTime').value;
        
        if (!startDateTime || !endDateTime) return;
        
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const diffMs = end.getTime() - start.getTime();
        
        if (diffMs < 0) {
            document.getElementById('durationTotal').textContent = 'End time must be after start time';
            return;
        }
        
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        const remainingHours = diffHours % 24;
        const remainingMinutes = diffMinutes % 60;
        
        document.getElementById('durationDays').textContent = diffDays;
        document.getElementById('durationHours').textContent = remainingHours;
        document.getElementById('durationMinutes').textContent = remainingMinutes;
        
        let totalText = '';
        if (diffDays > 0) {
            totalText = `Total: ${diffDays} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
        } else if (diffHours > 0) {
            totalText = `Total: ${diffHours} hours, ${remainingMinutes} minutes`;
        } else {
            totalText = `Total: ${diffMinutes} minutes`;
        }
        
        document.getElementById('durationTotal').textContent = totalText;
    }

    setupEventListeners() {
        document.getElementById('startDateTime').addEventListener('input', () => this.calculate());
        document.getElementById('endDateTime').addEventListener('input', () => this.calculate());
    }
}

// Global function for backward compatibility
function calculateDuration() {
    window.durationCalculator.calculate();
}

// Initialize duration calculator
window.durationCalculator = new DurationCalculator();