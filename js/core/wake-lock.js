// Wake Lock Management
class WakeLockManager {
    constructor() {
        this.wakeLock = null;
        this.init();
    }

    async init() {
        await this.requestWakeLock();
        this.setupEventListeners();
    }

    async requestWakeLock() {
        try {
            this.wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock is active');

            this.wakeLock.addEventListener('release', () => {
                console.log('Wake Lock released');
            });
        } catch (err) {
            console.error('Failed to activate Wake Lock:', err);
        }
    }

    setupEventListeners() {
        // Re-request wake lock if visibility changes
        document.addEventListener('visibilitychange', () => {
            if (this.wakeLock !== null && document.visibilityState === 'visible') {
                this.requestWakeLock();
            }
        });
    }
}

// Initialize wake lock manager when page loads
window.addEventListener('load', () => {
    window.wakeLockManager = new WakeLockManager();
});