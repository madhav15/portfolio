// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Scroll reveal animations with enhanced observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .education-card, .contact-item, .highlight-box, .tech-tag').forEach(el => {
    observer.observe(el);
});

// Add CSS for reveal animation trigger
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .expertise-card, .project-card, .timeline-item, .education-card, .contact-item, .highlight-box {
        opacity: 0;
        transform: translateY(30px);
    }

    .reveal-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .section-title {
        opacity: 0;
        animation: fadeInDown 0.8s ease-out forwards;
    }

    section:first-of-type .section-title {
        animation-delay: 0s;
    }
`;
document.head.appendChild(revealStyle);

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Enhanced parallax and floating animations
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;

        // Parallax for hero background
        if (scrollPosition < window.innerHeight) {
            const parallaxElements = hero.querySelectorAll('.hero::before, .hero::after');
            const moveY = scrollPosition * 0.5;
            hero.style.backgroundPosition = `0px ${moveY}px`;
        }

        // Fade hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const opacity = Math.max(0, 1 - scrollPosition / 400);
            heroContent.style.opacity = opacity;
        }
    }

    // Animate elements on scroll direction
    document.querySelectorAll('.expertise-card, .project-card').forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const offset = (rect.top / window.innerHeight) * 5;
            el.style.transform = `translateY(${Math.min(0, offset * 20)}px)`;
        }
    });
});

// Number counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);

        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(interval);
                } else {
                    const suffix = finalValue.match(/[^0-9]/g)?.join('') || '';
                    stat.textContent = Math.floor(currentValue) + suffix;
                }
            }, 30);
        }
    });
}

// Trigger counter animation when hero is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateCounters();
            entry.target.dataset.animated = 'true';
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Project links (update with actual project URLs)
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Project URL not set. Update the href in the HTML.');
    });
});

// Scroll to top on page load
window.scrollTo(0, 0);

// Mouse follow effect for expertise cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 16px 40px rgba(37, 99, 235, 0.3)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Log on page load
console.log('Portfolio website loaded successfully with enhanced animations!');
