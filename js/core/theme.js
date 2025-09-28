// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        const currentTheme = body.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = document.querySelector('.theme-icon');

        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }

    setupEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Global function for backward compatibility
function toggleTheme() {
    window.themeManager.toggleTheme();
}

// Initialize theme manager
window.themeManager = new ThemeManager();