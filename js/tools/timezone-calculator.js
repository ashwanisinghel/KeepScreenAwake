// Time Zone Calculator
class TimezoneCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.calculate();
    }

    calculate() {
        const fromTz = document.getElementById('fromTimezone').value;
        const toTz = document.getElementById('toTimezone').value;
        const timeValue = document.getElementById('fromTime').value;
        
        if (!timeValue) return;
        
        const today = new Date().toISOString().split('T')[0];
        const fromDateTime = new Date(`${today}T${timeValue}`);
        
        // Convert to target timezone
        const fromTime = new Date(fromDateTime.toLocaleString('en-US', { timeZone: fromTz }));
        const toTime = new Date(fromDateTime.toLocaleString('en-US', { timeZone: toTz }));
        
        const timeDiff = toTime.getTime() - fromTime.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        const resultTime = new Date(fromDateTime.getTime() + timeDiff);
        const timeString = resultTime.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        document.getElementById('timezoneResult').querySelector('.result-time').textContent = timeString;
        
        let diffText = '';
        if (hoursDiff > 0) {
            diffText = `${Math.abs(hoursDiff)} hours ahead`;
        } else if (hoursDiff < 0) {
            diffText = `${Math.abs(hoursDiff)} hours behind`;
        } else {
            diffText = 'Same time';
        }
        
        document.getElementById('timezoneResult').querySelector('.result-info').textContent = diffText;
    }

    setupEventListeners() {
        document.getElementById('fromTimezone').addEventListener('change', () => this.calculate());
        document.getElementById('toTimezone').addEventListener('change', () => this.calculate());
        document.getElementById('fromTime').addEventListener('input', () => this.calculate());
    }
}

// Global function for backward compatibility
function calculateTimezone() {
    window.timezoneCalculator.calculate();
}

// Initialize timezone calculator
window.timezoneCalculator = new TimezoneCalculator();