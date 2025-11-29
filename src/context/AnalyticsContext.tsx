import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { analyticsStorage } from '../lib/analytics/storage';

interface AnalyticsContextType {
  isEnabled: boolean;
  hasConsent: boolean;
  hasDecided: boolean;
  grantConsent: () => void;
  revokeConsent: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(() => {
    return analyticsStorage.hasConsent();
  });

  const [hasDecided, setHasDecided] = useState<boolean>(() => {
    return analyticsStorage.hasConsentDecision();
  });

  const isEnabled = hasConsent;

  const grantConsent = useCallback(() => {
    analyticsStorage.grantConsent();
    setHasConsent(true);
    setHasDecided(true);
  }, []);

  const revokeConsent = useCallback(() => {
    analyticsStorage.revokeConsent();
    setHasConsent(false);
    setHasDecided(true);
  }, []);

  // Sync state with storage on mount
  useEffect(() => {
    setHasConsent(analyticsStorage.hasConsent());
    setHasDecided(analyticsStorage.hasConsentDecision());
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isEnabled, hasConsent, hasDecided, grantConsent, revokeConsent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};
