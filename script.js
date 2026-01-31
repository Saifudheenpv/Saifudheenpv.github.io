// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARTICLES ANIMATION =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 255, 136, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Call createParticles on load
createParticles();

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
    
    // Add shadow to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== TYPING ANIMATION FOR HERO =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in real app, this would send to a server)
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #27c93f 0%, #1fa333 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===== TERMINAL CURSOR BLINK =====
const terminalCursor = document.querySelector('.cursor-blink-terminal');
if (terminalCursor) {
    setInterval(() => {
        terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// ===== PROJECT CARDS TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== TIMELINE ANIMATION ON SCROLL =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.3
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===== PARALLAX EFFECT ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-container');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== COPY EMAIL ON CLICK =====
const emailElements = document.querySelectorAll('a[href^="mailto:"]');
emailElements.forEach(el => {
    el.addEventListener('click', (e) => {
        const email = el.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--accent-primary);
                color: var(--bg-primary);
                padding: 1rem 2rem;
                border-radius: 5px;
                font-weight: 600;
                z-index: 10000;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
});

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize skill bars after load
    setTimeout(() => {
        document.querySelectorAll('.skill-category').forEach(category => {
            animateSkillBars(category);
        });
    }, 500);
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateMatrixMode();
    }
});

function activateMatrixMode() {
    const colors = [
        'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)',
        'linear-gradient(135deg, #ff006e 0%, #ff4081 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    ];
    
    let colorIndex = 0;
    const interval = setInterval(() => {
        document.documentElement.style.setProperty('--gradient-primary', colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 500);
    
    setTimeout(() => {
        clearInterval(interval);
        document.documentElement.style.setProperty(
            '--gradient-primary',
            'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)'
        );
    }, 5000);
}

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ADD GLITCH EFFECT TO SECTION NUMBERS =====
document.querySelectorAll('.section-number').forEach(number => {
    number.addEventListener('mouseenter', () => {
        const original = number.textContent;
        let glitchCount = 0;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        const glitchInterval = setInterval(() => {
            if (glitchCount < 5) {
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                number.textContent = randomChar + original.slice(1);
                glitchCount++;
            } else {
                number.textContent = original;
                clearInterval(glitchInterval);
            }
        }, 50);
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello DevOps Recruiter!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Saifudheen PV\'s Portfolio', 'color: #00d9ff; font-size: 16px;');
console.log('%cLooking for a talented DevOps Engineer? You\'re in the right place!', 'color: #e6e6e6; font-size: 14px;');
console.log('%c📧 Contact: mesaifudheenpv@gmail.com', 'color: #00ff88; font-size: 14px;');
console.log('%c🔗 GitHub: github.com/Saifudheenpv', 'color: #00d9ff; font-size: 14px;');
console.log('%c💼 LinkedIn: linkedin.com/in/saifudheenpv07', 'color: #00ff88; font-size: 14px;');

// ===== ANALYTICS PLACEHOLDER =====
// Add your Google Analytics or other analytics code here
// Example: gtag('config', 'GA_MEASUREMENT_ID');

console.log('%cPortfolio loaded successfully! 🚀', 'color: #00ff88; font-size: 16px; font-weight: bold;');