// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for timeline line
            if (entry.target.classList.contains('timeline-line')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(`
    .fade-in-up,
    .service-card,
    .trust-item,
    .step-card,
    .step-arrow,
    .project-card,
    .testimonial-card,
    .footer-brand,
    .footer-column,
    .footer-bottom,
    .timeline-line,
    .stat,
    .social-icon,
    .course-card,
    .coming-soon-card
`);

animatedElements.forEach(el => observer.observe(el));

// Trigger hero animations on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach(el => {
        el.classList.add('animate');
    });
});

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// // Add click handlers for CTA buttons
// document.querySelectorAll('.cta-button, .primary-button, .secondary-button, .cta-main-button').forEach(button => {
//     button.addEventListener('click', () => {
//         // Add click animation
//         button.style.transform = 'scale(0.95)';
//         setTimeout(() => {
//             button.style.transform = '';
//         }, 100);
        
//         // Show alert (replace with your actual form/modal logic)
//         alert('Thank you for your interest! In a real implementation, this would open a consultation booking form.');
//     });
// });

// Add click handlers for CTA buttons
document.querySelectorAll('.cta-button, .primary-button, .secondary-button, .cta-main-button')
.forEach(button => {
    button.addEventListener('click', () => {

        // Click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        // 👉 If Book a Free Call button
        if (button.classList.contains('cta-main-button')) {
            window.location.href =
                'mailto:joshwabj005@gmail.com?subject=Free%20Call%20Request&body=Hi,%20I%20would%20like%20to%20book%20a%20free%20call.';
            return;
        }

        // Other buttons behavior
        alert('Thank you for your interest! In a real implementation, this would open a consultation booking form.');
    });
});



function openGmail() {
    const email = "joshwabj005@gmail.com";
    const subject = "Free Call Request";
    const body = "Hi, I would like to book a free call.";

    const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(email) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.open(gmailURL, "_blank");
}






// Add click handlers for program buttons
document.querySelectorAll('.enroll-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Enrollment form would open here! You would be redirected to the enrollment page.');
    });
});

document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Syllabus PDF would download here!');
    });
});

document.querySelectorAll('.notify-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Notification sign-up form would open here!');
    });
});

// Parallax effect for background blobs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero blobs
    const heroBlobs = document.querySelectorAll('.hero-bg-blob');
    heroBlobs.forEach((blob, index) => {
        const speed = index === 0 ? 0.3 : 0.5;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Why section blob
    const whyBlob = document.querySelector('.why-bg-blob');
    if (whyBlob) {
        whyBlob.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    // CTA blobs
    const ctaBlobs = document.querySelectorAll('.cta-bg-blob');
    ctaBlobs.forEach((blob, index) => {
        const speed = index === 0 ? 0.15 : 0.25;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add pulse animation to primary buttons
setInterval(() => {
    const primaryButtons = document.querySelectorAll('.primary-button, .cta-button');
    primaryButtons.forEach(button => {
        button.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    });
}, 5000);

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.textContent.includes('%') ? '%' : '+');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            
            if (text.includes('50')) {
                animateCounter(entry.target, 0, 50, 1000);
            } else if (text.includes('95')) {
                animateCounter(entry.target, 0, 95, 1000);
            } else if (text.includes('3')) {
                entry.target.textContent = '3x';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Add shimmer effect to gradient text
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 20px 40px rgba(147, 51, 234, 0.3);
        }
        50% {
            box-shadow: 0 25px 50px rgba(147, 51, 234, 0.5);
        }
    }
    
    .gradient-text {
        background-size: 200% auto;
        animation: shimmer 3s linear infinite;
    }
    
    .service-card:hover .service-icon {
        animation: rotate360 0.5s ease;
    }
    
    @keyframes rotate360 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg) scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Mouse trail effect for hero section (optional visual enhancement)
let mouseTrail = [];
let maxTrailLength = 20;

document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'absolute';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + window.scrollY + 'px';
    trail.style.pointerEvents = 'none';
    trail.style.transition = 'opacity 0.5s, transform 0.5s';
    trail.style.zIndex = '1';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(2)';
    }, 10);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Magnetic effect for buttons
document.querySelectorAll('button, .social-icon').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Add tilt effect to cards
document.querySelectorAll('.service-card, .project-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Lazy loading for images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console easter egg
console.log(`
%c🚀 ClearCraft 
%cMade with ❤️ and ☕
%cInterested in working with us? Get in touch!

`, 
'font-size: 24px; font-weight: bold; background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; color: transparent;',
'font-size: 14px; color: #475569;',
'font-size: 12px; color: #9333ea; font-weight: bold;'
);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function openGmail() {
    const email = "joshwabj005@gmail.com";
    const subject = "Free Call Request";
    const body = "Hi, I would like to book a free call.";

    const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(email) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.open(gmailURL, "_blank");
}



// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Your scroll handler code here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100);
        });
    }, 100);
});

console.log('✅ ClearCraft website loaded successfully!');