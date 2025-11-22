import React from 'react';
import LandingPage from '../pages/LandingPage';
import DevelopLandingPage from '../pages/DevelopLandingPage';

const SmartLandingPage: React.FC = () => {
  const hostname = window.location.hostname;

  // Show DevelopLandingPage for develop subdomain
  if (hostname === 'develop.sproutn.ca' || hostname.startsWith('develop.')) {
    return <DevelopLandingPage />;
  }

  // Default to regular LandingPage
  return <LandingPage />;
};

export default SmartLandingPage;
