// UTM parameter and referrer extraction utilities

export interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

export interface ReferrerInfo {
  url: string | null;
  domain: string | null;
}

export interface LandingAttribution extends UTMParams, ReferrerInfo {
  landing_page: string;
  timestamp: string;
}

const STORAGE_KEY = 'sproutn_landing_attribution';

/**
 * Extract UTM parameters from current URL
 */
export function extractUTMParams(url: string = window.location.href): UTMParams {
  try {
    const searchParams = new URLSearchParams(new URL(url).search);

    return {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_term: searchParams.get('utm_term'),
      utm_content: searchParams.get('utm_content')
    };
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null
    };
  }
}

/**
 * Extract referrer information
 * Excludes same-domain referrers (internal navigation)
 */
export function extractReferrerInfo(): ReferrerInfo {
  const referrer = document.referrer;

  if (!referrer) {
    return { url: null, domain: null };
  }

  try {
    const url = new URL(referrer);
    // Exclude same-domain referrers
    if (url.hostname === window.location.hostname) {
      return { url: null, domain: null };
    }
    return {
      url: referrer,
      domain: url.hostname.replace('www.', '')
    };
  } catch {
    return { url: referrer, domain: null };
  }
}

/**
 * Persist landing page attribution for the session
 * Only captures on first page load (landing page)
 */
export function persistLandingAttribution(): void {
  const existingAttribution = sessionStorage.getItem(STORAGE_KEY);

  if (!existingAttribution) {
    const utmParams = extractUTMParams();
    const referrer = extractReferrerInfo();

    const attribution: LandingAttribution = {
      ...utmParams,
      url: referrer.url,
      domain: referrer.domain,
      landing_page: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  }
}

/**
 * Get landing page attribution for current session
 */
export function getLandingAttribution(): LandingAttribution {
  const stored = sessionStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  // Fallback if not stored (shouldn't happen normally)
  const utmParams = extractUTMParams();
  const referrer = extractReferrerInfo();

  return {
    ...utmParams,
    ...referrer,
    landing_page: window.location.pathname,
    timestamp: new Date().toISOString()
  };
}

/**
 * Detect device type from user agent
 */
export function detectDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  const ua = navigator.userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }

  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

/**
 * Detect browser from user agent
 */
export function detectBrowser(): string {
  const ua = navigator.userAgent;

  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';

  return 'Other';
}

/**
 * Detect OS from user agent
 */
export function detectOS(): string {
  const ua = navigator.userAgent;

  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';

  return 'Other';
}

/**
 * Get screen resolution
 */
export function getScreenResolution(): string {
  return `${window.screen.width}x${window.screen.height}`;
}
