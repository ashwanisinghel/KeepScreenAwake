// Epoch Time Converter
class EpochConverter {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    convertFromEpoch() {
        const epochInput = document.getElementById('epochInput');
        const epochValue = parseInt(epochInput.value);

        if (isNaN(epochValue)) {
            this.clearOutputs();
            return;
        }

        // Handle both seconds and milliseconds
        const timestamp = epochValue.toString().length === 10 ? epochValue * 1000 : epochValue;
        const date = new Date(timestamp);

        if (isNaN(date.getTime())) {
            this.clearOutputs();
            return;
        }

        this.updateOutputs(date);

        // Update datetime input
        const datetimeInput = document.getElementById('datetimeInput');
        const localDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        datetimeInput.value = localDateTime.toISOString().slice(0, 16);
    }

    convertToEpoch() {
        const datetimeInput = document.getElementById('datetimeInput');
        const datetimeValue = datetimeInput.value;

        if (!datetimeValue) {
            this.clearOutputs();
            return;
        }

        const date = new Date(datetimeValue);
        const epochTimestamp = Math.floor(date.getTime() / 1000);

        document.getElementById('epochInput').value = epochTimestamp;
        this.updateOutputs(date);
    }

    setCurrentEpoch() {
        const now = new Date();
        const epochTimestamp = Math.floor(now.getTime() / 1000);
        document.getElementById('epochInput').value = epochTimestamp;
        this.convertFromEpoch();
    }

    setCurrentDateTime() {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
        document.getElementById('datetimeInput').value = localDateTime.toISOString().slice(0, 16);
        this.convertToEpoch();
    }

    updateOutputs(date) {
        document.getElementById('humanReadable').textContent = date.toLocaleString();
        document.getElementById('isoString').textContent = date.toISOString();
        document.getElementById('utcString').textContent = date.toUTCString();
    }

    clearOutputs() {
        document.getElementById('humanReadable').textContent = '-';
        document.getElementById('isoString').textContent = '-';
        document.getElementById('utcString').textContent = '-';
    }

    setupEventListeners() {
        document.getElementById('epochInput').addEventListener('input', () => this.convertFromEpoch());
        document.getElementById('datetimeInput').addEventListener('input', () => this.convertToEpoch());
    }
}

// Global functions for backward compatibility
function convertFromEpoch() {
    window.epochConverter.convertFromEpoch();
}

function convertToEpoch() {
    window.epochConverter.convertToEpoch();
}

function setCurrentEpoch() {
    window.epochConverter.setCurrentEpoch();
}

function setCurrentDateTime() {
    window.epochConverter.setCurrentDateTime();
}

// Initialize epoch converter
window.epochConverter = new EpochConverter();