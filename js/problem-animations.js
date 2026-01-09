/**
 * Sickle Safe - Problem Page Animations
 * GSAP ScrollTrigger Journey Experience
 */

// ==========================================================================
// Mobile Menu (Shared)
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

        // Close on overlay click
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
// Scroll To Top
// ==========================================================================

const ScrollToTop = {
    button: null,

    init() {
        this.button = document.getElementById('scroll-to-top');
        if (!this.button) return;

        // Show/hide based on scroll position
        ScrollTrigger.create({
            start: "top -400",
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1 && self.progress > 0) {
                    this.show();
                } else if (self.progress === 0) {
                    this.hide();
                }
            }
        });

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: 0 },
                ease: "power2.inOut"
            });
        });
    },

    show() {
        gsap.to(this.button, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3
        });
    },

    hide() {
        gsap.to(this.button, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3
        });
    }
};


// ==========================================================================
// Problem Page Animations
// ==========================================================================

const ProblemAnimations = {

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.showAllContent();
            return;
        }

        this.heroAnimation();
        this.journeyLineAnimation();
        this.chapterAnimations();
        this.stepAnimations();
        this.statCardAnimations();
        this.fundingCalloutAnimation();
        this.solutionCTAAnimation();
    },

    // Show all content without animation for reduced motion users
    showAllContent() {
        gsap.set('.problem-badge, .problem-title, .problem-subtitle, .scroll-indicator', { opacity: 1 });
        gsap.set('.chapter-badge, .chapter-title, .chapter-subtitle', { opacity: 1 });
        gsap.set('.journey-step', { opacity: 1 });
        gsap.set('.stat-card', { opacity: 1 });
        gsap.set('.funding-callout', { opacity: 1 });
        gsap.set('.solution-cta', { opacity: 1 });
        gsap.set('#journey-line-fill', { height: '100%' });
        gsap.set('.journey-dot', { backgroundColor: '#8B0000' });
    },

    // --- HERO ANIMATION ---
    heroAnimation() {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        tl.to('.problem-badge', {
            opacity: 1,
            y: 0,
            duration: 0.8
        })
        .to('.problem-title', {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=0.4")
        .to('.problem-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, "-=0.5")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1
        }, "-=0.3");

        // Parallax effect on hero background elements
        gsap.to('#problem-hero .bg-luxury-accent\\/5', {
            y: 100,
            scrollTrigger: {
                trigger: '#problem-hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    },

    // --- JOURNEY LINE ANIMATION ---
    journeyLineAnimation() {
        // Draw the accent line as user scrolls
        gsap.to("#journey-line-fill", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "#problem-journey",
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1
            }
        });
    },

    // --- CHAPTER HEADER ANIMATIONS ---
    chapterAnimations() {
        document.querySelectorAll('.journey-chapter').forEach((chapter) => {
            const badge = chapter.querySelector('.chapter-badge');
            const title = chapter.querySelector('.chapter-title');
            const subtitle = chapter.querySelector('.chapter-subtitle');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: chapter,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            if (badge) {
                tl.to(badge, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }

            if (title) {
                tl.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.3");
            }

            if (subtitle) {
                tl.to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.4");
            }
        });
    },

    // --- STEP ANIMATIONS ---
    stepAnimations() {
        document.querySelectorAll('.journey-step').forEach((step, i) => {
            const dot = step.querySelector('.journey-dot');

            // Fade in the step
            gsap.to(step, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Fill the dot when line reaches it
            if (dot) {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 70%",
                    onEnter: () => {
                        gsap.to(dot, {
                            backgroundColor: "#8B0000",
                            scale: 1.2,
                            duration: 0.3,
                            ease: "back.out(2)"
                        });
                        gsap.to(dot, {
                            scale: 1,
                            duration: 0.2,
                            delay: 0.3
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(dot, {
                            backgroundColor: "#F5F5F0",
                            duration: 0.3
                        });
                    }
                });
            }
        });
    },

    // --- STAT CARD ANIMATIONS ---
    statCardAnimations() {
        document.querySelectorAll('.stat-card').forEach((card, i) => {
            const numberEl = card.querySelector('.stat-number');
            const targetCount = numberEl ? parseInt(numberEl.dataset.count) : 0;

            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    onEnter: () => {
                        // Animate the number counting up
                        if (numberEl && targetCount) {
                            gsap.fromTo(numberEl,
                                { innerText: 0 },
                                {
                                    innerText: targetCount,
                                    duration: 2,
                                    ease: "power2.out",
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        numberEl.innerText = Math.floor(this.targets()[0].innerText);
                                    }
                                }
                            );
                        }
                    }
                }
            });
        });
    },

    // --- FUNDING CALLOUT ANIMATION ---
    fundingCalloutAnimation() {
        const callout = document.querySelector('.funding-callout');
        if (!callout) return;

        gsap.to(callout, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: callout,
                start: "top 85%"
            }
        });
    },

    // --- SOLUTION CTA ANIMATION ---
    solutionCTAAnimation() {
        const cta = document.querySelector('.solution-cta');
        if (!cta) return;

        gsap.to(cta, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: cta,
                start: "top 85%"
            }
        });
    }
};


// ==========================================================================
// Smooth Scroll for Anchor Links
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
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: target, offsetY: 80 },
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }
};


// ==========================================================================
// Year Update
// ==========================================================================

const YearUpdate = {
    init() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
};


// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    MobileMenu.init();
    YearUpdate.init();

    // Initialize animations after a small delay to ensure DOM is ready
    setTimeout(() => {
        ProblemAnimations.init();
        ScrollToTop.init();
        SmoothScroll.init();
    }, 100);
});


// Handle page visibility changes (refresh ScrollTrigger when tab becomes visible)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        ScrollTrigger.refresh();
    }
});


// Refresh ScrollTrigger on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
