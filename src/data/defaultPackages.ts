// Default photography packages
export const defaultPhotographyPackages = [
  {
    id: 'photo_pkg_basic',
    name: 'Basic',
    price: 299,
    imageCount: 5,
    videoIncluded: false,
    description: 'Essential product photography for small catalogs',
    features: [
      '5 high-resolution product images',
      'White background',
      '2 angles per product',
      '3-day turnaround',
      'Basic retouching'
    ],
    recommended: false
  },
  {
    id: 'photo_pkg_standard',
    name: 'Standard',
    price: 599,
    imageCount: 10,
    videoIncluded: false,
    description: 'Professional photography for growing brands',
    features: [
      '10 high-resolution product images',
      'White + lifestyle backgrounds',
      '4 angles per product',
      '5-day turnaround',
      'Professional retouching',
      'Model shots available'
    ],
    recommended: true
  },
  {
    id: 'photo_pkg_premium',
    name: 'Premium',
    price: 999,
    imageCount: 20,
    videoIncluded: true,
    description: 'Complete visual package for established brands',
    features: [
      '20 high-resolution product images',
      'Multiple background options',
      '6 angles per product',
      '7-day turnaround',
      'Advanced retouching',
      'Model shots included',
      '30-second product video'
    ],
    recommended: false
  }
];

// Default marketing packages
export const defaultMarketingPackages = [
  {
    id: 'mkt_pkg_starter',
    name: 'Launch Starter',
    price: 499,
    description: 'Essential marketing for new product launches',
    features: [
      'Brand positioning strategy',
      'Target audience analysis',
      'Social media content plan (1 month)',
      'Launch checklist',
      'Basic competitor analysis'
    ],
    recommended: false
  },
  {
    id: 'mkt_pkg_growth',
    name: 'Growth',
    price: 999,
    description: 'Comprehensive marketing for scaling brands',
    features: [
      'Complete brand strategy',
      'Detailed market research',
      'Social media content plan (3 months)',
      'Email marketing templates',
      'Influencer outreach strategy',
      'SEO keyword research'
    ],
    recommended: true
  },
  {
    id: 'mkt_pkg_enterprise',
    name: 'Enterprise',
    price: 2499,
    description: 'Full-service marketing for established brands',
    features: [
      'Executive brand strategy',
      'Comprehensive market analysis',
      'Social media management (6 months)',
      'Email marketing automation',
      'Influencer partnerships',
      'Paid advertising strategy',
      'PR outreach plan',
      'Quarterly performance reviews'
    ],
    recommended: false
  }
];
