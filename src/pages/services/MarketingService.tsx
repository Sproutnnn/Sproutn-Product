import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, LineChartIcon, MonitorIcon, BriefcaseIcon, BarChart3Icon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const MarketingService: React.FC = () => {
  const packages = [{
    name: 'Basic',
    price: '$599',
    description: 'Essential marketing strategy for product launch',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (1 month)'],
    popular: false
  }, {
    name: 'Standard',
    price: '$999',
    description: 'Comprehensive marketing strategy with extended support',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (2 months)', 'Ad campaign strategy'],
    popular: true
  }, {
    name: 'Premium',
    price: '$1,799',
    description: 'Complete marketing solution with brand development',
    features: ['Detailed marketing strategy document', 'Social media launch plan', 'Basic SEO strategy', 'Content calendar (3 months)', 'Ad campaign strategy', 'Website template', 'Brand identity development', 'Logo design'],
    popular: false
  }];
  return <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen w-full text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-charcoal-800/50 z-0"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Strategic marketing launch plan
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
              Get a personalized marketing launch plan according to research specialized to your market
            </p>
            <Link to="/login" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The plan
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A comprehensive launch roll out that focuses on competitive research, budget analysis, and available opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <BriefcaseIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Strategy Development
              </h3>
              <p className="text-gray-300 mb-4">
                Tailored marketing strategies based on market research,
                competitive analysis, and consumer insights to position your
                product for success.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <MonitorIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Marketing</h3>
              <p className="text-gray-300 mb-4">
                Comprehensive digital marketing services including social media,
                content marketing, SEO, email campaigns, and paid advertising to
                reach your target audience.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <LineChartIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Analytics & Optimization
              </h3>
              <p className="text-gray-300 mb-4">
                Data-driven approach to marketing with detailed analytics,
                performance tracking, and continuous optimization to maximize
                ROI and drive conversions.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Packages Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Marketing Packages
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the marketing package that aligns with your business goals
              and budget
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => <div key={index} className={`bg-charcoal-700/30 backdrop-blur-sm rounded-xl border ${pkg.popular ? 'border-primary-400 transform scale-105 md:scale-105 shadow-xl shadow-primary-900/20' : 'border-charcoal-600'} overflow-hidden`}>
                {pkg.popular && <div className="bg-primary-500 text-white text-center py-2 font-medium">
                    Most Popular
                  </div>}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary-400 mb-4">
                    {pkg.price}
                  </div>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => <li key={i} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>)}
                  </ul>
                  <Link to="/login" className={`block text-center py-2 px-4 rounded-md font-medium ${pkg.popular ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-charcoal-600 text-gray-300 hover:bg-charcoal-500'} transition-colors`}>
                    Get Started
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Marketing Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A strategic approach to marketing your product effectively
            </p>
          </div>
          <div className="space-y-6">
            {[{
            step: '01',
            title: 'Research & Analysis',
            description: 'We research your market, audience, and competitors to build a strong foundation'
          }, {
            step: '02',
            title: 'Strategy Development',
            description: 'We create a tailored marketing strategy aligned with your business goals'
          }, {
            step: '03',
            title: 'Campaign Creation',
            description: 'We develop compelling marketing campaigns and content for your target audience'
          }, {
            step: '04',
            title: 'Implementation',
            description: 'We execute the marketing plan across selected channels with precision'
          }, {
            step: '05',
            title: 'Analysis & Optimization',
            description: 'We track performance, analyze results, and optimize for continuous improvement'
          }].map((process, index) => <div key={index} className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 flex items-start">
                <div className="text-xl font-bold text-primary-400 mr-6">
                  {process.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Results Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Marketing Results
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our data-driven marketing strategies deliver measurable results
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                45%
              </div>
              <p className="text-gray-300">
                Average Increase in Conversion Rate
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                3.2x
              </div>
              <p className="text-gray-300">Average ROI on Marketing Spend</p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                68%
              </div>
              <p className="text-gray-300">Increase in Organic Traffic</p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                2.5x
              </div>
              <p className="text-gray-300">
                Average Growth in Social Engagement
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to market your product successfully?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Let our marketing experts help you reach your target audience and
            drive sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/login" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/services" className="px-8 py-3 border border-gray-500 text-gray-300 font-medium rounded-md hover:bg-charcoal-700 hover:text-white transition-all duration-300">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-8 mb-4" />
              <p className="text-gray-500 max-w-xs">
                From concept to market, we're with you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/prototyping" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Sourcing & Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-charcoal-700 text-center md:text-left text-gray-500">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default MarketingService;