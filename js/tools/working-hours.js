// Working Hours Calculator
class WorkingHoursCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.calculate();
    }

    calculate() {
        const yourTz = document.getElementById('yourTimezone').value;
        const colleagueTz = document.getElementById('colleagueTimezone').value;
        const workStart = document.getElementById('workStart').value;
        const workEnd = document.getElementById('workEnd').value;
        
        if (!workStart || !workEnd) return;
        
        const today = new Date().toISOString().split('T')[0];
        
        // Your working hours
        const yourStart = new Date(`${today}T${workStart}`);
        const yourEnd = new Date(`${today}T${workEnd}`);
        
        // Convert to colleague's timezone
        const colleagueStart = new Date(yourStart.toLocaleString('en-US', { timeZone: colleagueTz }));
        const colleagueEnd = new Date(yourEnd.toLocaleString('en-US', { timeZone: colleagueTz }));
        
        // Colleague's working hours in their timezone
        const colleagueWorkStart = new Date(`${today}T${workStart}`);
        const colleagueWorkEnd = new Date(`${today}T${workEnd}`);
        
        // Find overlap
        const overlapStart = new Date(Math.max(colleagueStart.getTime(), colleagueWorkStart.getTime()));
        const overlapEnd = new Date(Math.min(colleagueEnd.getTime(), colleagueWorkEnd.getTime()));
        
        if (overlapStart >= overlapEnd) {
            document.getElementById('overlapTime').textContent = 'No overlapping hours';
            document.getElementById('bestMeetingTime').textContent = '';
            return;
        }
        
        const overlapHours = (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60);
        const startTime = overlapStart.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const endTime = overlapEnd.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        document.getElementById('overlapTime').textContent = `${startTime} - ${endTime} (${overlapHours.toFixed(1)} hours)`;
        
        // Best meeting time (middle of overlap)
        const bestMeetingTime = new Date(overlapStart.getTime() + (overlapEnd.getTime() - overlapStart.getTime()) / 2);
        const bestTime = bestMeetingTime.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        document.getElementById('bestMeetingTime').textContent = `Best meeting time: ${bestTime}`;
    }

    setupEventListeners() {
        document.getElementById('yourTimezone').addEventListener('change', () => this.calculate());
        document.getElementById('colleagueTimezone').addEventListener('change', () => this.calculate());
        document.getElementById('workStart').addEventListener('input', () => this.calculate());
        document.getElementById('workEnd').addEventListener('input', () => this.calculate());
    }
}

// Global function for backward compatibility
function calculateWorkingHours() {
    window.workingHoursCalculator.calculate();
}

// Initialize working hours calculator
window.workingHoursCalculator = new WorkingHoursCalculator();