import React from 'react';
import { Link } from 'react-router-dom';
import { useAnalyticsContext } from '../context/AnalyticsContext';
import { X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { hasDecided, grantConsent, revokeConsent } = useAnalyticsContext();

  // Don't show if user has already made a decision
  if (hasDecided) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-charcoal-800 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <p className="text-sm text-gray-200">
              We use cookies to analyze site traffic and optimize your experience.
              By continuing to use our site, you consent to our use of cookies.{' '}
              <Link
                to="/cookies"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                Learn more
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={revokeConsent}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-500 rounded-md hover:bg-charcoal-700 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={grantConsent}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
