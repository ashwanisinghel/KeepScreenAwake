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
        
        try {
            // Get today's date
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            
            // Parse working hours
            const [startHour, startMin] = workStart.split(':').map(Number);
            const [endHour, endMin] = workEnd.split(':').map(Number);
            
            // Create working hours as UTC times for easier comparison
            const yourStartUTC = this.createUTCTime(dateStr, startHour, startMin, yourTz);
            const yourEndUTC = this.createUTCTime(dateStr, endHour, endMin, yourTz);
            
            const colleagueStartUTC = this.createUTCTime(dateStr, startHour, startMin, colleagueTz);
            const colleagueEndUTC = this.createUTCTime(dateStr, endHour, endMin, colleagueTz);
            
            // Find overlap in UTC
            const overlapStartUTC = Math.max(yourStartUTC, colleagueStartUTC);
            const overlapEndUTC = Math.min(yourEndUTC, colleagueEndUTC);
            
            if (overlapStartUTC >= overlapEndUTC) {
                document.getElementById('overlapTime').textContent = 'No overlapping hours';
                document.getElementById('bestMeetingTime').textContent = 'Try adjusting working hours or consider async communication';
                return;
            }
            
            // Calculate overlap duration
            const overlapMs = overlapEndUTC - overlapStartUTC;
            const overlapHours = overlapMs / (1000 * 60 * 60);
            
            // Convert overlap times to both timezones for display
            const overlapStartYour = this.formatUTCTimeInTimezone(overlapStartUTC, yourTz);
            const overlapEndYour = this.formatUTCTimeInTimezone(overlapEndUTC, yourTz);
            
            const overlapStartColleague = this.formatUTCTimeInTimezone(overlapStartUTC, colleagueTz);
            const overlapEndColleague = this.formatUTCTimeInTimezone(overlapEndUTC, colleagueTz);
            
            // Display overlap
            document.getElementById('overlapTime').textContent = 
                `${overlapStartYour} - ${overlapEndYour} (${this.getTimezoneAbbr(yourTz)}) | ${overlapStartColleague} - ${overlapEndColleague} (${this.getTimezoneAbbr(colleagueTz)}) | ${overlapHours.toFixed(1)} hours`;
            
            // Best meeting time (middle of overlap)
            const bestMeetingUTC = overlapStartUTC + overlapMs / 2;
            const bestTimeYour = this.formatUTCTimeInTimezone(bestMeetingUTC, yourTz);
            const bestTimeColleague = this.formatUTCTimeInTimezone(bestMeetingUTC, colleagueTz);
            
            document.getElementById('bestMeetingTime').textContent = 
                `Best meeting time: ${bestTimeYour} (${this.getTimezoneAbbr(yourTz)}) | ${bestTimeColleague} (${this.getTimezoneAbbr(colleagueTz)})`;
                
        } catch (error) {
            console.error('Error calculating working hours:', error);
            document.getElementById('overlapTime').textContent = 'Error calculating overlap';
            document.getElementById('bestMeetingTime').textContent = '';
        }
    }

    createUTCTime(dateStr, hour, minute, timezone) {
        // Create a date in the specified timezone and return UTC timestamp
        const localDate = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`);
        
        // Get the timezone offset for this date
        const tempDate = new Date(localDate.toLocaleString('en-US', { timeZone: timezone }));
        const utcDate = new Date(localDate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const offset = tempDate.getTime() - utcDate.getTime();
        
        return localDate.getTime() - offset;
    }

    formatUTCTimeInTimezone(utcTimestamp, timezone) {
        const date = new Date(utcTimestamp);
        return date.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    getTimezoneAbbr(timezone) {
        const abbrs = {
            'America/New_York': 'EST/EDT',
            'America/Los_Angeles': 'PST/PDT',
            'Europe/London': 'GMT/BST',
            'Europe/Paris': 'CET/CEST',
            'Asia/Tokyo': 'JST',
            'Asia/Kolkata': 'IST',
            'Australia/Sydney': 'AEST/AEDT'
        };
        return abbrs[timezone] || timezone;
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