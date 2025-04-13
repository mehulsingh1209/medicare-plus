// Image Loading and Animation Functions
document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-fade, .animate-slide');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.visibility = 'hidden';
        animationObserver.observe(el);
    });

    // Staggered animations for grid items
    const staggeredContainers = document.querySelectorAll('.stagger-animation');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.style.visibility = 'visible';
                });
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    staggeredContainers.forEach(container => {
        Array.from(container.children).forEach(child => {
            child.style.visibility = 'hidden';
        });
        staggerObserver.observe(container);
    });

    // Parallax effect for hero sections
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.backgroundPositionY = `${rate}px`;
        });
    });

    // Image zoom effect on hover
    const zoomElements = document.querySelectorAll('.zoom-effect');
    
    zoomElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('zoomed');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('zoomed');
        });
    });
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade, .animate-slide, .stagger-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Contact Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const phone = contactForm.querySelector('[name="phone"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            // Here you would typically send the form data to your server
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Parallax effect for hero sections
const parallaxHero = document.querySelector('.parallax-bg');
if (parallaxHero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxHero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Achievement counter animation
const achievementStats = document.querySelectorAll('.stat-item h3');
if (achievementStats.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.dataset.value);
                animateCounter(target, endValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    achievementStats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, endValue) {
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = endValue / (duration / 16); // 60fps

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
            element.textContent = endValue.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
    }, 16);
} 