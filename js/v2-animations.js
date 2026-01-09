/**
 * Sickle Safe V2 - GSAP Animations
 * Cinematic scroll-based animations for landing page
 */

// ==========================================================================
// Initialize GSAP and Plugins
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
        return;
    }

    // Initialize all animations
    initHeroAnimations();
    initProblemAnimations();
    initSolutionAnimations();
    initFeaturesAnimations();
    initHowItWorksAnimations();
    initQuoteAnimations();
    initEarlyAccessAnimations();
    initFooterAnimations();

    // Refresh ScrollTrigger on resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});


// ==========================================================================
// SECTION 1: HERO ANIMATIONS
// ==========================================================================

function initHeroAnimations() {
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
}


// ==========================================================================
// SECTION 2: THE PROBLEM ANIMATIONS
// ==========================================================================

function initProblemAnimations() {
    // Main heading animation
    gsap.from("#problem .section-badge", {
        scrollTrigger: {
            trigger: "#problem",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from("#problem .section-title", {
        scrollTrigger: {
            trigger: "#problem",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from("#problem .section-desc", {
        scrollTrigger: {
            trigger: "#problem",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Pain points - staggered reveal with border animation
    gsap.from("#problem .pain-point", {
        scrollTrigger: {
            trigger: "#problem .pain-points",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2
    });

    // Animate the border accent
    gsap.from("#problem .pain-point .border-accent", {
        scrollTrigger: {
            trigger: "#problem .pain-points",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        stagger: 0.2
    });
}


// ==========================================================================
// SECTION 3: THE SOLUTION (ROLE CARDS) ANIMATIONS
// ==========================================================================

function initSolutionAnimations() {
    // Section header
    gsap.from("#solution .section-badge", {
        scrollTrigger: {
            trigger: "#solution",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from("#solution .section-title", {
        scrollTrigger: {
            trigger: "#solution",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from("#solution .section-desc", {
        scrollTrigger: {
            trigger: "#solution",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Role cards - staggered entrance with scale
    gsap.from("#solution .role-card", {
        scrollTrigger: {
            trigger: "#solution .roles-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            from: "start"
        },
        ease: "back.out(1.4)"
    });

    // Icon circles pop in
    gsap.from("#solution .role-card .icon-circle", {
        scrollTrigger: {
            trigger: "#solution .roles-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        scale: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(2)"
    });
}


// ==========================================================================
// SECTION 4: FEATURES ANIMATIONS (Stacked Cards on Mobile, Normal on Desktop)
// ==========================================================================

function initFeaturesAnimations() {
    const cards = gsap.utils.toArray("#features .stacked-card");
    const isMobile = window.innerWidth < 768;

    if (cards.length === 0) return;

    // Mobile: Stacked cards with scale/opacity effect
    if (isMobile) {
        cards.forEach((card, i) => {
            // Entrance animation
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 60,
                duration: 0.6,
                ease: "power3.out"
            });

            // Scale down and fade previous cards as next card covers them
            if (i < cards.length - 1) {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top 90%",
                        end: "top 30%",
                        scrub: true
                    },
                    scale: 0.92,
                    opacity: 0.4,
                    ease: "none"
                });
            }
        });
    } else {
        // Desktop: Standard scroll animations for each block
        cards.forEach((card) => {
            // Animate the number
            gsap.from(card.querySelector("span"), {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: "power2.out"
            });

            // Animate the title
            gsap.from(card.querySelector("h3"), {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });

            // Animate the description
            gsap.from(card.querySelector("p"), {
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            });

            // Animate the tags
            const tags = card.querySelectorAll(".flex span");
            if (tags.length > 0) {
                gsap.from(tags, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.5)"
                });
            }
        });
    }
}


// ==========================================================================
// SECTION 5: HOW IT WORKS ANIMATIONS
// ==========================================================================

function initHowItWorksAnimations() {
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
}


// ==========================================================================
// SECTION 6: EMOTIONAL QUOTE ANIMATIONS
// ==========================================================================

function initQuoteAnimations() {
    // Parallax effect on quote text
    gsap.to("#quote .quote-text", {
        scrollTrigger: {
            trigger: "#quote",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        yPercent: -20,
        ease: "none"
    });

    // Quote fade in
    gsap.from("#quote .quote-text", {
        scrollTrigger: {
            trigger: "#quote",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from("#quote .quote-desc", {
        scrollTrigger: {
            trigger: "#quote",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Tags stagger in
    gsap.from("#quote .tag", {
        scrollTrigger: {
            trigger: "#quote .tags",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)"
    });
}


// ==========================================================================
// SECTION 7: EARLY ACCESS CTA ANIMATIONS
// ==========================================================================

function initEarlyAccessAnimations() {
    // Section header
    gsap.from("#early-access .section-badge", {
        scrollTrigger: {
            trigger: "#early-access",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from("#early-access .section-title", {
        scrollTrigger: {
            trigger: "#early-access",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from("#early-access .section-desc", {
        scrollTrigger: {
            trigger: "#early-access",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Form card slide up
    gsap.from("#early-access .form-card", {
        scrollTrigger: {
            trigger: "#early-access .form-card",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out"
    });

    // Form fields stagger
    gsap.from("#early-access .form-field", {
        scrollTrigger: {
            trigger: "#early-access .form-card",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3
    });

    // Submit button
    gsap.from("#early-access .submit-btn", {
        scrollTrigger: {
            trigger: "#early-access .form-card",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.6
    });
}


// ==========================================================================
// FOOTER: FADE TO BLACK ANIMATION
// ==========================================================================

function initFooterAnimations() {
    // Fade body to black as footer enters
    ScrollTrigger.create({
        trigger: "#footer",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            const bgColor = gsap.utils.interpolate("#F5F5F0", "#1A1A1A", progress);
            document.body.style.backgroundColor = bgColor;
        },
        onLeaveBack: () => {
            gsap.to("body", { backgroundColor: "#F5F5F0", duration: 0.5 });
        }
    });

    // Footer content fade in
    gsap.from("#footer .footer-content", {
        scrollTrigger: {
            trigger: "#footer",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Social links stagger
    gsap.from("#footer .social-link", {
        scrollTrigger: {
            trigger: "#footer .social-links",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)"
    });
}


// ==========================================================================
// UTILITY: Magnetic button effect
// ==========================================================================

function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}
