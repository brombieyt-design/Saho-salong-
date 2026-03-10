// Navbar scroll effect + hero color handling
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        if (!hero) {
            navbar.classList.add('scrolled');
            return;
        }
        navbar.classList.remove('scrolled');
    }

    if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight - 80;
        if (scrollY < heroBottom && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('on-hero');
        } else {
            navbar.classList.remove('on-hero');
        }
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
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
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.service-card, .review-card, .location-card, .price-category');

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

// Remove Elfsight branding (injected dynamically after widget loads)
const feedContainer = document.getElementById('instagram-feed');
if (feedContainer) {
    function removeElfsightBranding() {
        document.querySelectorAll('a[href*="elfsight"]').forEach(el => el.remove());
        document.querySelectorAll('.instagram-feed *').forEach(el => {
            if (el.textContent && (el.textContent.includes('Free Instagram') || el.textContent.includes('Elfsight'))) {
                el.remove();
            }
        });
    }

    const brandingInterval = setInterval(removeElfsightBranding, 500);
    setTimeout(() => clearInterval(brandingInterval), 15000);

    const brandingObserver = new MutationObserver(removeElfsightBranding);
    brandingObserver.observe(feedContainer, { childList: true, subtree: true });
}

// Smooth scroll for anchor links (only same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Gallery filter
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.photo-gallery-grid .gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'alla' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    let currentIndex = 0;

    function getVisibleImages() {
        return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(index) {
        const visible = getVisibleImages();
        currentIndex = index;
        const img = visible[index].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCounter.textContent = `${index + 1} / ${visible.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(direction) {
        const visible = getVisibleImages();
        currentIndex = (currentIndex + direction + visible.length) % visible.length;
        const img = visible[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${visible.length}`;
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const visible = getVisibleImages();
            const index = visible.indexOf(item);
            if (index !== -1) openLightbox(index);
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}
