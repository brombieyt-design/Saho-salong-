// Navbar scroll effect + hero color handling
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function updateNavbar() {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight - 80;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollY < heroBottom && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('on-hero');
    } else {
        navbar.classList.remove('on-hero');
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.service-card, .review-card, .location-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
