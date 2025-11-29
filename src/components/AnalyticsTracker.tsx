import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Global analytics tracker component
 * Place this inside AnalyticsProvider to enable automatic page tracking
 */
export const AnalyticsTracker: React.FC = () => {
  // Hook handles all tracking automatically
  useAnalytics();

  // Renders nothing - just tracking logic
  return null;
};
