import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAnalyticsContext } from '../context/AnalyticsContext';
import { analyticsStorage } from '../lib/analytics/storage';
import {
  persistLandingAttribution,
  getLandingAttribution,
  detectDeviceType,
  detectBrowser,
  detectOS,
  getScreenResolution
} from '../lib/analytics/utm';
import { analyticsService, TrackingContext } from '../services/analytics.service';

export function useAnalytics() {
  const location = useLocation();
  const { user } = useAuth();
  const { isEnabled } = useAnalyticsContext();

  const initializedRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);

  // Track page view
  const trackPageView = useCallback(async () => {
    if (!isEnabled) return;

    const visitorId = analyticsStorage.getVisitorId();
    const { sessionId, isNewSession } = analyticsStorage.getSession();
    const previousPath = analyticsStorage.getPreviousPagePath();
    const attribution = getLandingAttribution();

    const context: TrackingContext = {
      visitorCookieId: visitorId,
      sessionCookieId: sessionId,
      userId: user?.id,
      pagePath: location.pathname,
      pageUrl: window.location.href,
      pageTitle: document.title,
      previousPagePath: previousPath || undefined,
      referrer: attribution.url || undefined,
      utmSource: attribution.utm_source || undefined,
      utmMedium: attribution.utm_medium || undefined,
      utmCampaign: attribution.utm_campaign || undefined,
      utmTerm: attribution.utm_term || undefined,
      utmContent: attribution.utm_content || undefined,
      deviceType: detectDeviceType(),
      browser: detectBrowser(),
      os: detectOS(),
      screenResolution: getScreenResolution(),
      isNewSession
    };

    // Add to page journey
    analyticsStorage.addToPageJourney(location.pathname);

    // Send to server (fire and forget)
    analyticsService.recordPageView(context).catch(err => {
      console.error('[Analytics] Failed to record page view:', err);
    });
  }, [location.pathname, user?.id, isEnabled]);

  // Initialize on mount
  useEffect(() => {
    if (!initializedRef.current && isEnabled) {
      persistLandingAttribution();
      initializedRef.current = true;
    }
  }, [isEnabled]);

  // Track page views on route change
  useEffect(() => {
    if (!isEnabled) return;

    // Avoid tracking same path twice
    if (lastPathRef.current === location.pathname) return;
    lastPathRef.current = location.pathname;

    // Small delay to allow page title to update
    const timeout = setTimeout(() => {
      trackPageView();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname, isEnabled, trackPageView]);

  return {
    trackPageView,
    visitorId: isEnabled ? analyticsStorage.getVisitorId() : null,
    sessionId: isEnabled ? analyticsStorage.getSession().sessionId : null
  };
}
