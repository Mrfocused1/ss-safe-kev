/**
 * Sickle Safe - Main JavaScript
 * GSAP Animations & Interactive Features
 */

// ==========================================================================
// Logo Switcher (Light/Dark based on scroll position)
// ==========================================================================

const LogoSwitcher = {
    logo: null,
    menuBtn: null,
    darkSections: ['statements', 'dark-card', 'footer'],
    lightSections: ['hero', 'services-wrapper', 'crisis', 'medical-id', 'how-it-works-intro', 'features', 'faq', 'contact'],

    init() {
        this.logo = document.querySelector('nav a[href="#hero"] img');
        this.menuBtn = document.getElementById('menu-btn');
        if (!this.logo) return;

        // Set initial state
        this.updateLogo();

        // Update on scroll
        window.addEventListener('scroll', () => this.updateLogo(), { passive: true });
    },

    updateLogo() {
        const scrollPosition = window.scrollY + (window.innerHeight / 3);
        let currentSection = null;

        // Find which section we're in
        [...this.darkSections, ...this.lightSections].forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });

        // Update logo and menu button based on section
        if (currentSection && this.darkSections.includes(currentSection)) {
            this.logo.src = 'assets/logo-light.png';
            if (this.menuBtn) {
                this.menuBtn.classList.remove('text-luxury-text');
                this.menuBtn.classList.add('text-luxury-base');
            }
        } else {
            this.logo.src = 'assets/logo.png';
            if (this.menuBtn) {
                this.menuBtn.classList.remove('text-luxury-base');
                this.menuBtn.classList.add('text-luxury-text');
            }
        }
    }
};

// ==========================================================================
// Mobile Menu
// ==========================================================================

const MobileMenu = {
    overlay: null,
    menuBtn: null,
    closeBtn: null,
    menuLinks: null,
    isOpen: false,

    init() {
        this.overlay = document.getElementById('menu-overlay');
        this.menuBtn = document.getElementById('menu-btn');
        this.closeBtn = document.getElementById('menu-close');
        this.menuLinks = document.querySelectorAll('.menu-overlay a');

        if (!this.overlay || !this.menuBtn) return;

        this.menuBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on link click
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on overlay click (outside menu)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    },

    open() {
        this.overlay.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        this.closeBtn.focus();
    },

    close() {
        this.overlay.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
        this.menuBtn.focus();
    }
};


// ==========================================================================
// Form Validation & Submission
// ==========================================================================

const ContactForm = {
    form: null,
    fields: {},
    submitBtn: null,
    successMessage: null,

    init() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.fields = {
            name: this.form.querySelector('#name'),
            email: this.form.querySelector('#email'),
            role: this.form.querySelector('#role')
        };
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.successMessage = document.getElementById('form-success');

        // Real-time validation
        this.fields.name.addEventListener('blur', () => this.validateField('name'));
        this.fields.email.addEventListener('blur', () => this.validateField('email'));
        this.fields.email.addEventListener('input', () => this.clearError('email'));
        this.fields.name.addEventListener('input', () => this.clearError('name'));

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const parent = field.closest('.form-group');

        switch (fieldName) {
            case 'name':
                if (field.value.trim().length < 2) {
                    this.setError(parent, 'Name must be at least 2 characters');
                    return false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    this.setError(parent, 'Please enter a valid email');
                    return false;
                }
                break;
        }

        this.setSuccess(parent);
        return true;
    },

    setError(parent, message) {
        parent.classList.remove('success');
        parent.classList.add('error');
        const errorEl = parent.querySelector('.error-message');
        if (errorEl) errorEl.textContent = message;
    },

    setSuccess(parent) {
        parent.classList.remove('error');
        parent.classList.add('success');
    },

    clearError(fieldName) {
        const field = this.fields[fieldName];
        const parent = field.closest('.form-group');
        parent.classList.remove('error');
    },

    validateAll() {
        let isValid = true;
        isValid = this.validateField('name') && isValid;
        isValid = this.validateField('email') && isValid;
        return isValid;
    },

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateAll()) {
            // Shake animation for invalid form
            gsap.to(this.form, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: "power2.out"
            });
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'contact_form',
                    email: this.fields.email.value,
                    name: this.fields.name.value,
                    role: this.fields.role.value,
                    sessionId: window.Analytics?.sessionId
                })
            });

            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Error submitting. Please try again.');
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    },

    showSuccess() {
        // Fade out form
        gsap.to(this.form, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                this.form.style.display = 'none';
                this.successMessage.classList.add('active');
                gsap.fromTo(this.successMessage,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }
        });
    }
};


// ==========================================================================
// Smooth Scroll
// ==========================================================================

const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    // Use GSAP for smooth scroll
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: target, offsetY: 0 },
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }
};


// ==========================================================================
// GSAP Animations
// ==========================================================================

const Animations = {
    init() {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        this.heroAnimation();
        this.statementsAnimation();
        this.servicesAnimation();
        this.crisisAnimation();
        this.medicalIdAnimation();
        this.howItWorksAnimation();
        this.footerAnimation();
    },

    // --- SECTION 1: HERO ANIMATION (V2 Style) ---
    heroAnimation() {
        const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Set initial states
        gsap.set("#hero .hero-badge", { opacity: 0, y: 30 });
        gsap.set("#hero .hero-title", { opacity: 0, y: 50 });
        gsap.set("#hero .hero-subtitle", { opacity: 0, y: 30 });
        gsap.set("#hero .hero-form", { opacity: 0, y: 30 });
        gsap.set("#hero .hero-note", { opacity: 0 });
        gsap.set("#hero .phone-mockup", { opacity: 0, scale: 0.8, y: 50 });

        // Animate in sequence
        heroTl
            .to("#hero .hero-badge", {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, 0.3)
            .to("#hero .hero-title", {
                opacity: 1,
                y: 0,
                duration: 1
            }, 0.5)
            .to("#hero .hero-subtitle", {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, 0.8)
            .to("#hero .hero-form", {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, 1)
            .to("#hero .hero-note", {
                opacity: 1,
                duration: 0.6
            }, 1.2)
            .to("#hero .phone-mockup", {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, 0.6);

        // Floating animation for phone mockup
        gsap.to("#hero .phone-mockup", {
            y: -15,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // Scroll indicator pulse
        gsap.to("#hero .scroll-indicator", {
            y: 10,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    },

    // --- SECTION 2: BRAND STATEMENTS ---
    statementsAnimation() {
        const statements = gsap.utils.toArray(".statement");
        const statementTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#statements",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1
            }
        });

        statements.forEach((stmt, i) => {
            // Entrance
            statementTl.to(stmt, {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                z: 0,
                duration: 1,
                ease: "power2.out"
            });

            // Exit (unless last)
            if (i < statements.length - 1) {
                statementTl.to(stmt, {
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 1.2,
                    z: 100,
                    duration: 1,
                    ease: "power2.in"
                }, "+=0.5");
            }
        });
    },

    // --- SECTION 3: SERVICES (Horizontal Scroll) ---
    servicesAnimation() {
        const servicesContainer = document.querySelector("#services-container");
        if (!servicesContainer) return;

        gsap.to(servicesContainer, {
            x: () => -(servicesContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#services-wrapper",
                pin: true,
                scrub: 1,
                end: () => "+=" + servicesContainer.scrollWidth,
                invalidateOnRefresh: true
            }
        });
    },

    // --- SECTION 5: MEDICAL ID ANIMATION ---
    medicalIdAnimation() {
        // Animate the ID card with a reveal effect
        gsap.from("#id-card-visual", {
            scrollTrigger: {
                trigger: "#medical-id",
                start: "top 60%"
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power2.out"
        });

        // Animate each feature list item with stagger
        gsap.utils.toArray(".med-id-item").forEach((item, i) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#medical-id",
                    start: "top 60%"
                }
            });
        });
    },

    // --- SECTION 6: HOW IT WORKS (Pinned Scroll) ---
    howItWorksAnimation() {
        // Section intro header animation
        gsap.from("#how-it-works-intro .section-badge", {
            scrollTrigger: {
                trigger: "#how-it-works-intro",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });

        gsap.from("#how-it-works-intro .section-title", {
            scrollTrigger: {
                trigger: "#how-it-works-intro",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });

        // Pinned scroll animation
        const hiwList = document.querySelector(".hiw-list");
        const hiwFill = document.querySelector(".hiw-fill");
        const hiwListItems = gsap.utils.toArray(".hiw-list li");
        const hiwSlides = gsap.utils.toArray(".hiw-slide");

        // Skip if elements don't exist
        if (!hiwList || !hiwFill || hiwListItems.length === 0) {
            return;
        }

        // Calculate the height of the list for the fill bar
        const listHeight = hiwList.offsetHeight;
        gsap.set(hiwFill, { height: listHeight });

        // Create the pinned timeline
        const hiwTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hiw-pin-section",
                start: "top top",
                end: "+=" + hiwListItems.length * 50 + "%",
                pin: true,
                scrub: true
            }
        });

        // Set initial state for fill bar (show 1/3 for first item)
        gsap.set(hiwFill, {
            scaleY: 1 / hiwListItems.length,
            transformOrigin: "top left"
        });

        // Animate list items and slides
        hiwListItems.forEach((item, i) => {
            const previousItem = hiwListItems[i - 1];

            if (previousItem) {
                // Highlight current item, fade in current slide
                hiwTl.set(item, { color: "#8B0000" }, 0.5 * i)
                    .to(hiwSlides[i], {
                        autoAlpha: 1,
                        duration: 0.2
                    }, "<")
                    // Unhighlight previous item, fade out previous slide
                    .set(previousItem, { color: "#9CA3AF" }, "<")
                    .to(hiwSlides[i - 1], {
                        autoAlpha: 0,
                        duration: 0.2
                    }, "<");
            } else {
                // First item - set initial state
                gsap.set(item, { color: "#8B0000" });
                gsap.set(hiwSlides[i], { autoAlpha: 1 });
            }
        });

        // Animate the fill bar to grow with scroll
        hiwTl.to(hiwFill, {
            scaleY: 1,
            transformOrigin: "top left",
            ease: "none",
            duration: hiwTl.duration()
        }, 0)
        // Add a small pause at the end before unpinning
        .to({}, { duration: 0.5 });
    },

    // --- CRISIS MODE TIMELINE ANIMATION ---
    crisisAnimation() {
        // Draw the red line
        gsap.to("#crisis-line-fill", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "#crisis",
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1
            }
        });

        // Reveal Steps and fill circles
        gsap.utils.toArray(".crisis-step").forEach((step, i) => {
            const dot = step.querySelector(".crisis-dot");

            // Fade in the step
            gsap.to(step, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 75%"
                }
            });

            // Fill the circle with red when line reaches it
            if (dot) {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 70%",
                    onEnter: () => {
                        dot.style.backgroundColor = "#8B0000";
                    },
                    onLeaveBack: () => {
                        dot.style.backgroundColor = "#F5F5F0";
                    }
                });
            }
        });
    },

    // --- SECTION 7: FOOTER (Fade to Black) ---
    footerAnimation() {
        ScrollTrigger.create({
            trigger: "#footer",
            start: "top bottom",
            end: "bottom bottom",
            onEnter: () => gsap.to("body", {
                backgroundColor: "#000000",
                color: "#666",
                duration: 1
            }),
            onLeaveBack: () => gsap.to("body", {
                backgroundColor: "#F5F5F0",
                color: "#2C2C2C",
                duration: 1
            })
        });
    }
};


// ==========================================================================
// Image Loader with Skeleton States
// ==========================================================================

const ImageLoader = {
    init() {
        // Find all images with data-src (lazy load) or regular images
        this.setupLazyLoading();
        this.setupEagerImages();
    },

    setupLazyLoading() {
        // Use Intersection Observer for lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px', // Start loading 100px before visible
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => this.loadImage(img));
        }
    },

    setupEagerImages() {
        // Handle images that should load immediately (eager)
        const eagerImages = document.querySelectorAll('.img-loading img:not([data-src])');

        eagerImages.forEach(img => {
            if (img.complete) {
                this.markAsLoaded(img);
            } else {
                img.addEventListener('load', () => this.markAsLoaded(img));
                img.addEventListener('error', () => this.handleError(img));
            }
        });
    },

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create a new image to preload
        const tempImage = new Image();

        tempImage.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            this.markAsLoaded(img);
        };

        tempImage.onerror = () => {
            this.handleError(img);
        };

        tempImage.src = src;
    },

    markAsLoaded(img) {
        const wrapper = img.closest('.img-loading');
        if (wrapper) {
            // Small delay for smooth transition
            requestAnimationFrame(() => {
                wrapper.classList.add('loaded');
            });
        }

        // Remove loading class from image itself
        img.classList.remove('loading');

        // Dispatch custom event
        img.dispatchEvent(new CustomEvent('imageLoaded', { bubbles: true }));
    },

    handleError(img) {
        const wrapper = img.closest('.img-loading');
        if (wrapper) {
            wrapper.classList.add('error');
            // Could show a placeholder or error state here
            console.warn('Failed to load image:', img.src || img.dataset.src);
        }
    }
};


// ==========================================================================
// Service Modal (Bottom Sheet)
// ==========================================================================

const ServiceModal = {
    content: [
        {
            title: "The Overcomer",
            subtitle: "For Patients",
            desc: "Take control of your Sickle Cell journey. Our app gives you a one-tap crisis alert that instantly notifies your entire care circle with your GPS location. Set up an offline Medical ID with your blood type, allergies, and crisis protocols that works even without internet. Track your daily wellness — pain levels, hydration, medications, mood, and triggers — to identify patterns and predict crises before they happen. Never face a difficult moment alone again.",
            modalImg: "assets/images/warrior2.jpg"
        },
        {
            title: "The Helper",
            subtitle: "For Family & Caregivers",
            desc: "Know the moment something's wrong. When your loved one triggers crisis mode, you'll receive an instant push notification with their real-time location and estimated arrival time. View their daily health metrics to understand how they're really doing. See medication adherence, pain trends, and hydration levels. Coordinate with other circle members through group messaging. When crisis strikes, everyone moves together.",
            modalImg: "assets/images/caregiver2.jpg"
        },
        {
            title: "The Volunteer",
            subtitle: "For Community Supporters",
            desc: "Make a meaningful impact in the SCD community. Track your volunteer hours and see real metrics on the difference you're making. Join community events and awareness campaigns. Complete missions and earn recognition for your contributions. Connect directly with patients through peer support forums. Your time matters — we help you see exactly how much.",
            modalImg: "assets/images/volunteer2.jpg"
        }
    ],

    init() {
        this.modal = document.getElementById('service-modal');
        this.overlay = document.getElementById('modal-overlay');
        this.closeBtn = document.getElementById('modal-close');

        if (!this.modal || !this.overlay) return;

        this.bindEvents();
    },

    bindEvents() {
        // Open modal on More button click
        document.querySelectorAll('.service-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                this.open(index);
            });
        });

        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        this.overlay.addEventListener('click', () => this.close());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open(index) {
        const data = this.content[index];
        if (!data) return;

        // Populate content
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-subtitle').textContent = data.subtitle;
        document.getElementById('modal-desc').textContent = data.desc;
        document.getElementById('modal-img').src = data.modalImg;
        document.getElementById('modal-img').alt = data.title;

        // Show modal
        this.overlay.style.opacity = '1';
        this.overlay.style.pointerEvents = 'auto';
        this.modal.style.transform = 'translateY(0)';

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.overlay.style.opacity = '0';
        this.overlay.style.pointerEvents = 'none';
        this.modal.style.transform = 'translateY(100%)';

        // Restore body scroll
        document.body.style.overflow = '';
    }
};


// ==========================================================================
// FAQ Accordion
// ==========================================================================

const FAQAccordion = {
    init() {
        const triggers = document.querySelectorAll('.faq-trigger');
        if (!triggers.length) return;

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => this.toggle(trigger));
        });
    },

    toggle(trigger) {
        const item = trigger.closest('.faq-item');
        const content = item.querySelector('.faq-content');
        const icon = trigger.querySelector('.faq-icon');
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherItem.querySelector('.faq-icon');

                otherTrigger.setAttribute('aria-expanded', 'false');
                otherContent.classList.add('hidden');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current item
        if (isExpanded) {
            trigger.setAttribute('aria-expanded', 'false');
            content.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        } else {
            trigger.setAttribute('aria-expanded', 'true');
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
        }
    }
};


// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    LogoSwitcher.init();
    MobileMenu.init();
    ContactForm.init();
    SmoothScroll.init();
    ImageLoader.init();
    ServiceModal.init();
    FAQAccordion.init();

    // Only initialize animations if user doesn't prefer reduced motion
    if (!prefersReducedMotion) {
        Animations.init();
    }

    // Console branding
    console.log('%c SICKLE SAFE ', 'background: #8B0000; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Private Health Management ', 'color: #666; font-size: 12px;');
});


// ==========================================================================
// Handle Window Resize for ScrollTrigger
// ==========================================================================

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
