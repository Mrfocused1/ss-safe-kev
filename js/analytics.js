// Sickle Safe Analytics Tracker
// Privacy-focused, lightweight analytics (no third-party cookies)

const Analytics = {
  sessionId: null,
  startTime: Date.now(),
  scrollDepthTracked: new Set(),
  isTracking: false,

  init() {
    // Respect Do Not Track
    if (navigator.doNotTrack === '1') {
      console.log('[Analytics] Do Not Track enabled, skipping analytics');
      return;
    }

    // Generate or retrieve session ID
    this.sessionId = localStorage.getItem('ss_session_id');
    if (!this.sessionId) {
      this.sessionId = this.generateSessionId();
      localStorage.setItem('ss_session_id', this.sessionId);
    }

    this.isTracking = true;

    // Track page view
    this.trackPageView();

    // Setup event listeners
    this.setupScrollTracking();
    this.setupClickTracking();
    this.setupTimeTracking();

    console.log('[Analytics] Initialized with session:', this.sessionId);
  },

  generateSessionId() {
    // Generate a UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  async trackPageView() {
    try {
      await fetch('/api/track-page-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          pagePath: window.location.pathname,
          referrer: document.referrer || '',
          userAgent: navigator.userAgent,
          screenWidth: window.innerWidth
        })
      });
      console.log('[Analytics] Page view tracked:', window.location.pathname);
    } catch (error) {
      console.error('[Analytics] Failed to track page view:', error);
    }
  },

  async trackEvent(eventName, eventData = {}) {
    if (!this.isTracking) return;

    try {
      await fetch('/api/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          eventName,
          eventData,
          pagePath: window.location.pathname
        })
      });
      console.log('[Analytics] Event tracked:', eventName, eventData);
    } catch (error) {
      console.error('[Analytics] Failed to track event:', error);
    }
  },

  setupScrollTracking() {
    let scrollTimeout;
    const scrollDepths = [25, 50, 75, 100];

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = this.getScrollPercentage();

        scrollDepths.forEach(depth => {
          if (scrollPercent >= depth && !this.scrollDepthTracked.has(depth)) {
            this.scrollDepthTracked.add(depth);
            this.trackEvent(`scroll_${depth}`, { scrollPercent });
          }
        });
      }, 150); // Throttle to 150ms
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  },

  getScrollPercentage() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;

    if (trackLength <= 0) return 100;
    return Math.min(100, Math.round((scrollTop / trackLength) * 100));
  },

  setupClickTracking() {
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      const eventData = {
        element: target.tagName.toLowerCase(),
        text: target.textContent.trim().substring(0, 50),
        href: target.href || null
      };

      // Track button clicks
      if (target.tagName === 'BUTTON') {
        this.trackEvent('button_click', eventData);
      }

      // Track external link clicks
      if (target.tagName === 'A' && target.href && !target.href.startsWith(window.location.origin)) {
        this.trackEvent('external_link_click', eventData);
      }
    }, { passive: true });
  },

  setupTimeTracking() {
    // Send time on page when user leaves
    const sendTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000); // in seconds

      // Use sendBeacon for reliability on page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({
          sessionId: this.sessionId,
          eventName: 'time_on_page',
          eventData: { timeOnPage },
          pagePath: window.location.pathname
        })], { type: 'application/json' });

        navigator.sendBeacon('/api/track-event', blob);
      }
    };

    // Track on page visibility change (tab switching) and unload
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        sendTimeOnPage();
      }
    });

    window.addEventListener('beforeunload', sendTimeOnPage);
  }
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
  Analytics.init();
}

// Export for use in other scripts
window.Analytics = Analytics;
