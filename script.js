// --- Mobile Menu Toggle ---
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and x
    const icon = mobileMenuToggle.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// --- Active Navbar highlighting on scroll ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// --- Typing Effect ---
const typingText = document.querySelector('.typing-text');
const words = ["Engineer Arus Lemah.", "Desainer PCB.", "Pengembang Sistem IoT."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if(typingText) setTimeout(type, 1000);
});

// --- Scroll Reveal Animation (Intersection Observer) ---
const reveals = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            
            // Trigger stats animation if it's the stats container
            if (entry.target.classList.contains('hero-stats')) {
                animateStats();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// --- Stats Counter Animation ---
let statsAnimated = false;
const statNums = document.querySelectorAll('.stat-num');

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    statNums.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.innerText = Math.ceil(current) + "+";
                requestAnimationFrame(updateCounter);
            } else {
                stat.innerText = target + "+";
            }
        };
        updateCounter();
    });
}

// --- Toast Notification ---
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // reset form
    document.getElementById('contact-form').reset();
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
