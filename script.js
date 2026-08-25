/* ============================================
   AGRO - Farming Company Website Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ===== Mobile Menu =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    document.addEventListener('click', function(event) {
        const action = event.target.closest('button, a.btn');
        if (!action || action.closest('.nav') || action.closest('.footer-nav')) return;
        window.location.href = '404.html';
    }, true);

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (nav) nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== Active Navigation =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .footer-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== Scroll Animations (Intersection Observer) =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== Back to Top =====
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Form Validation =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Name validation - letters and spaces only
            const nameInput = document.getElementById('contactName');
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (nameInput) {
                const nameGroup = nameInput.closest('.form-group');
                if (!nameInput.value.trim()) {
                    showError(nameGroup, 'Name is required');
                    isValid = false;
                } else if (!nameRegex.test(nameInput.value.trim())) {
                    showError(nameGroup, 'Name must contain only letters and spaces');
                    isValid = false;
                } else {
                    clearError(nameGroup);
                }
            }

            // Email validation
            const emailInput = document.getElementById('contactEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput) {
                const emailGroup = emailInput.closest('.form-group');
                if (!emailInput.value.trim()) {
                    showError(emailGroup, 'Email is required');
                    isValid = false;
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailGroup, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    clearError(emailGroup);
                }
            }

            // Phone validation - exactly 10 digits
            const phoneInput = document.getElementById('contactPhone');
            const phoneRegex = /^\d{10}$/;
            if (phoneInput) {
                const phoneGroup = phoneInput.closest('.form-group');
                if (!phoneInput.value.trim()) {
                    showError(phoneGroup, 'Phone is required');
                    isValid = false;
                } else if (!phoneRegex.test(phoneInput.value.trim())) {
                    showError(phoneGroup, 'Phone must be exactly 10 digits');
                    isValid = false;
                } else {
                    clearError(phoneGroup);
                }
            }

            // Message validation
            const messageInput = document.getElementById('contactMessage');
            if (messageInput) {
                const messageGroup = messageInput.closest('.form-group');
                if (!messageInput.value.trim()) {
                    showError(messageGroup, 'Message is required');
                    isValid = false;
                } else {
                    clearError(messageGroup);
                }
            }

            if (isValid) {
                // Simulate form submission
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    window.location.href = '404.html';
                }, 1000);
            }
        });
    }

    // ===== Newsletter Validation =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailInput.value.trim()) {
                alert('Please fill the field.');
                emailInput.focus();
                return;
            }

            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            // Valid email - redirect to 404
            emailInput.value = '';
            window.location.href = '404.html';
        });
    });

    // ===== Helper Functions =====
    function showError(formGroup, message) {
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-msg');
        if (errorMsg) errorMsg.textContent = message;
    }

    function clearError(formGroup) {
        formGroup.classList.remove('error');
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Parallax Effect for Hero =====
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }

    // ===== Stagger Animation for Cards =====
    const staggerContainers = document.querySelectorAll('.stagger-container');

    staggerContainers.forEach(container => {
        const children = container.children;
        const staggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                Array.from(children).forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    child.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 100);
                });
                staggerObserver.unobserve(container);
            }
        }, { threshold: 0.1 });

        staggerObserver.observe(container);
    });

    // ===== Input Focus Effects =====
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

});
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});