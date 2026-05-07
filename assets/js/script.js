// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
});

// Scroll to section function - FIXED
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn('Section not found:', sectionId);
    }
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(0, 78, 137, 0.2) 100%)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--dark-bg) 0%, rgba(0, 78, 137, 0.1) 100%)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Subscribe button click handlers - FIXED to actually scroll
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const planName = button.closest('.pricing-card').querySelector('.plan-name').textContent;
        showNotification(`تم تحديد الخطة: ${planName}`, 'success');
        
        // Scroll to contact section
        setTimeout(() => {
            scrollToSection('#contact');
        }, 500);
    });
});

// Hero section buttons - FIXED
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
if (heroButtons.length > 0) {
    heroButtons[0].addEventListener('click', () => {
        scrollToSection('#pricing');
    });
    
    heroButtons[1].addEventListener('click', () => {
        scrollToSection('#features');
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate form
        if (name.trim() && email.trim() && message.trim()) {
            // Simulate sending (in real app, use fetch or XMLHttpRequest)
            showNotification('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');
            contactForm.reset();
        } else {
            showNotification('يرجى ملء جميع الحقول', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#FF6B35' : '#ff4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile responsive nav menu
function setupMobileNav() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && navLinks) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'linear-gradient(135deg, rgba(10, 14, 39, 0.98) 0%, rgba(0, 78, 137, 0.2) 100%)';
        navLinks.style.gap = '0';
        navLinks.style.padding = '1rem 0';
        navLinks.style.display = 'none';
        navLinks.style.zIndex = '999';
        
        navLinks.querySelectorAll('li').forEach(item => {
            item.style.padding = '1rem';
            item.style.textAlign = 'center';
            item.style.borderBottom = '1px solid rgba(255, 107, 53, 0.1)';
        });
    }
}

window.addEventListener('resize', setupMobileNav);
setupMobileNav();

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

console.log('IPTV Landing Page - Loaded Successfully');
