// Navigation Management
class Navigation {
    constructor() {
        this.activeSection = 'world-clock';
        this.lastScrollY = 0;
        this.navbar = null;
        this.init();
    }

    init() {
        this.navbar = document.querySelector('.navbar');
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupAutoHide();
        this.updateActiveNavItem();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!e.target.closest('.navbar')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Show navbar when navigating
            this.showNavbar();
        }
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('.section-anchor');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.setActiveNavItem(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Fallback scroll listener for better accuracy
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollIndicator();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupAutoHide() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Show navbar on mouse move near top
        document.addEventListener('mousemove', (e) => {
            if (e.clientY <= 100) {
                this.showNavbar();
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for enhanced styling
        if (currentScrollY > 50) {
            this.navbar.classList.add('navbar-scrolled');
        } else {
            this.navbar.classList.remove('navbar-scrolled');
        }

        // Auto-hide logic
        if (currentScrollY > 100) { // Only hide after scrolling past 100px
            if (currentScrollY > this.lastScrollY && !this.navbar.classList.contains('navbar-hidden')) {
                // Scrolling down - hide navbar
                this.hideNavbar();
            } else if (currentScrollY < this.lastScrollY && this.navbar.classList.contains('navbar-hidden')) {
                // Scrolling up - show navbar
                this.showNavbar();
            }
        } else {
            // Always show navbar at top of page
            this.showNavbar();
        }

        this.lastScrollY = currentScrollY;
    }

    hideNavbar() {
        if (this.navbar) {
            this.navbar.classList.add('navbar-hidden');
        }
    }

    showNavbar() {
        if (this.navbar) {
            this.navbar.classList.remove('navbar-hidden');
        }
    }

    setActiveNavItem(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section's nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.activeSection = sectionId;
        }
    }

    updateActiveNavItem() {
        // Set initial active state based on current scroll position
        const sections = document.querySelectorAll('.section-anchor');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.setActiveNavItem(section.id);
            }
        });
    }

    updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        scrollIndicator.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    // Public method to programmatically navigate to a section
    navigateToSection(sectionId) {
        this.scrollToSection(sectionId);
    }

    // Public method to get current active section
    getCurrentSection() {
        return this.activeSection;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});