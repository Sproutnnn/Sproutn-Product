// Analytics storage utilities for visitor and session management

const STORAGE_KEYS = {
  VISITOR_ID: 'sproutn_visitor_id',
  SESSION_ID: 'sproutn_session_id',
  SESSION_TIMESTAMP: 'sproutn_session_ts',
  FIRST_VISIT: 'sproutn_first_visit',
  PAGE_JOURNEY: 'sproutn_journey',
  CONSENT: 'sproutn_analytics_consent'
};

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Generate a unique ID
 */
function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${randomPart}`;
}

export const analyticsStorage = {
  /**
   * Get or create visitor ID (persisted in localStorage)
   */
  getVisitorId(): string {
    let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);

    if (!visitorId) {
      visitorId = generateId('v');
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
      localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, Date.now().toString());
    }

    return visitorId;
  },

  /**
   * Check if this is a new visitor (first seen less than 30 minutes ago)
   */
  isNewVisitor(): boolean {
    const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
    if (!firstVisit) return true;

    const firstVisitTime = parseInt(firstVisit);
    const now = Date.now();

    // Consider new if first visit was less than 30 minutes ago
    return (now - firstVisitTime) < SESSION_TIMEOUT_MS;
  },

  /**
   * Get or create session ID with timeout handling
   * Returns { sessionId, isNewSession }
   */
  getSession(): { sessionId: string; isNewSession: boolean } {
    const existingSession = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    const lastActivity = sessionStorage.getItem(STORAGE_KEYS.SESSION_TIMESTAMP);
    const now = Date.now();

    // Check if session is still valid
    if (existingSession && lastActivity) {
      const timeSinceActivity = now - parseInt(lastActivity);
      if (timeSinceActivity < SESSION_TIMEOUT_MS) {
        // Update activity timestamp
        sessionStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, now.toString());
        return { sessionId: existingSession, isNewSession: false };
      }
    }

    // Create new session
    const newSessionId = generateId('s');
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, newSessionId);
    sessionStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, now.toString());
    sessionStorage.setItem(STORAGE_KEYS.PAGE_JOURNEY, JSON.stringify([]));

    return { sessionId: newSessionId, isNewSession: true };
  },

  /**
   * Update session activity timestamp
   */
  updateSessionActivity(): void {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, Date.now().toString());
  },

  /**
   * Get page journey for current session
   */
  getPageJourney(): Array<{ path: string; timestamp: string }> {
    const journey = sessionStorage.getItem(STORAGE_KEYS.PAGE_JOURNEY);
    return journey ? JSON.parse(journey) : [];
  },

  /**
   * Add page to journey
   */
  addToPageJourney(path: string): void {
    const journey = this.getPageJourney();
    journey.push({
      path,
      timestamp: new Date().toISOString()
    });
    sessionStorage.setItem(STORAGE_KEYS.PAGE_JOURNEY, JSON.stringify(journey));
  },

  /**
   * Get previous page path from journey
   */
  getPreviousPagePath(): string | null {
    const journey = this.getPageJourney();
    if (journey.length < 1) return null;
    return journey[journey.length - 1]?.path || null;
  },

  /**
   * Check if analytics consent has been given
   */
  hasConsent(): boolean {
    return localStorage.getItem(STORAGE_KEYS.CONSENT) === 'granted';
  },

  /**
   * Grant analytics consent
   */
  grantConsent(): void {
    localStorage.setItem(STORAGE_KEYS.CONSENT, 'granted');
  },

  /**
   * Revoke analytics consent and clear data
   */
  revokeConsent(): void {
    localStorage.setItem(STORAGE_KEYS.CONSENT, 'denied');
    this.clearAnalyticsData();
  },

  /**
   * Check if consent decision has been made
   */
  hasConsentDecision(): boolean {
    return localStorage.getItem(STORAGE_KEYS.CONSENT) !== null;
  },

  /**
   * Clear all analytics data
   */
  clearAnalyticsData(): void {
    localStorage.removeItem(STORAGE_KEYS.VISITOR_ID);
    localStorage.removeItem(STORAGE_KEYS.FIRST_VISIT);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_TIMESTAMP);
    sessionStorage.removeItem(STORAGE_KEYS.PAGE_JOURNEY);
  }
};
