// Theme Management
class ThemeManager {
    constructor() {
        // Load theme immediately (before DOM is ready)
        this.loadThemeFromStorage();
        
        // Wait for DOM to be ready for event listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.updateThemeIcon();
        this.setupEventListeners();
    }

    toggleTheme() {
        console.log('Toggle theme called');
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        const currentTheme = body.getAttribute('data-theme');

        console.log('Current theme:', currentTheme);

        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
            console.log('Switched to light theme');
        } else {
            body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark theme');
        }
    }

    loadThemeFromStorage() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }
    }

    updateThemeIcon() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = document.querySelector('.theme-icon');
        
        if (themeIcon) {
            if (savedTheme === 'dark') {
                themeIcon.textContent = '☀️';
            } else {
                themeIcon.textContent = '🌙';
            }
        }
    }

    setupEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            // Remove any existing listeners to prevent duplicates
            themeToggle.removeEventListener('click', this.handleToggle);
            
            // Bind the method to preserve 'this' context
            this.handleToggle = () => this.toggleTheme();
            themeToggle.addEventListener('click', this.handleToggle);
            
            console.log('Theme toggle event listener attached');
        } else {
            console.warn('Theme toggle button not found');
        }
    }
}

// Global function for backward compatibility
function toggleTheme() {
    if (window.themeManager) {
        window.themeManager.toggleTheme();
    }
}

// Initialize theme manager immediately
window.themeManager = new ThemeManager();