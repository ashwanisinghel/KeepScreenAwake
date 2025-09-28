// World Clock Management
class WorldClock {
    constructor() {
        this.init();
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.setupLoadAnimation();
    }

    updateTime() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const timezone = card.getAttribute('data-timezone');

            // Create date object for the specific timezone
            const now = new Date();
            const options = {
                timeZone: timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };

            const dateOptions = {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            const timeString = now.toLocaleTimeString('en-US', options);
            const dateString = now.toLocaleDateString('en-US', dateOptions);

            const clock = card.querySelector('.clock');
            const dateElement = card.querySelector('.date');

            if (clock) clock.textContent = timeString;
            if (dateElement) dateElement.textContent = dateString;
        });
    }

    setupLoadAnimation() {
        window.addEventListener('load', () => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }
}

// Initialize world clock
window.worldClock = new WorldClock();