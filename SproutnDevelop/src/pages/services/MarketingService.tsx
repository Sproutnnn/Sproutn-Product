import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, LineChartIcon, MonitorIcon, BriefcaseIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const MarketingService: React.FC = () => {
  const packages = [{
    name: 'Basic Marketing Package',
    price: '$599',
    description: 'Essential marketing strategy for product launch',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (1 month)'],
    popular: false
  }, {
    name: 'Standard Marketing Package',
    price: '$999',
    description: 'Comprehensive marketing strategy with extended support',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (2 months)', 'Ad campaign strategy'],
    popular: false
  }, {
    name: 'Premium Marketing Package',
    price: '$1,799',
    description: 'Complete marketing solution with brand development',
    features: ['Detailed marketing strategy document', 'Social media launch plan', 'Basic SEO strategy', 'Content calendar (3 months)', 'Ad campaign strategy', 'Website template', 'Brand identity development', 'Logo design'],
    popular: true
  }];
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#016E4E] to-[#859CB6] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strategic Marketing Solutions
            </h1>
            <p className="text-xl mb-8">
              Launch and grow your product with data-driven marketing
              strategies. Our marketing experts help you reach your target
              audience and drive sales.
            </p>
            <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#016E4E] bg-white hover:bg-gray-100 transition-colors">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Marketing Services
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              Comprehensive marketing solutions to help your product succeed in
              the marketplace
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-8 w-8 text-[#016E4E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Strategy Development
              </h3>
              <p className="text-[#434C54]">
                Tailored marketing strategies based on market research,
                competitive analysis, and consumer insights to position your
                product for success.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#859CB6] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <MonitorIcon className="h-8 w-8 text-[#859CB6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Digital Marketing
              </h3>
              <p className="text-[#434C54]">
                Comprehensive digital marketing services including social media,
                content marketing, SEO, email campaigns, and paid advertising to
                reach your target audience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#D1CDC2] bg-opacity-50 rounded-full flex items-center justify-center mb-4">
                <LineChartIcon className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Analytics & Optimization
              </h3>
              <p className="text-[#434C54]">
                Data-driven approach to marketing with detailed analytics,
                performance tracking, and continuous optimization to maximize
                ROI and drive conversions.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Packages Section */}
      <section className="py-16 bg-[#D1CDC2] bg-opacity-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Marketing Packages
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              Choose the marketing package that aligns with your business goals
              and budget
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${pkg.popular ? 'ring-2 ring-[#016E4E] transform scale-105 md:scale-105' : ''}`}>
                {pkg.popular && <div className="bg-[#016E4E] text-white text-center py-2 font-medium">
                    Most Popular
                  </div>}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#434C54] mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#016E4E] mb-4">
                    {pkg.price}
                  </div>
                  <p className="text-[#434C54] mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => <li key={i} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-[#016E4E] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-[#434C54]">{feature}</span>
                      </li>)}
                  </ul>
                  <Link to="/login" className={`block text-center py-2 px-4 rounded-md font-medium ${pkg.popular ? 'bg-[#016E4E] text-white hover:bg-opacity-90' : 'bg-[#859CB6] bg-opacity-20 text-[#434C54] hover:bg-opacity-30'} transition-colors`}>
                    Get Started
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our Marketing Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              A strategic approach to marketing your product effectively
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[{
            step: '1',
            title: 'Research & Analysis',
            description: 'We research your market, audience, and competitors to build a strong foundation'
          }, {
            step: '2',
            title: 'Strategy Development',
            description: 'We create a tailored marketing strategy aligned with your business goals'
          }, {
            step: '3',
            title: 'Campaign Creation',
            description: 'We develop compelling marketing campaigns and content for your target audience'
          }, {
            step: '4',
            title: 'Implementation',
            description: 'We execute the marketing plan across selected channels with precision'
          }, {
            step: '5',
            title: 'Analysis & Optimization',
            description: 'We track performance, analyze results, and optimize for continuous improvement'
          }].map((process, index) => <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#016E4E] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                  {process.title}
                </h3>
                <p className="text-[#434C54]">{process.description}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Results Section */}
      <section className="py-16 bg-[#859CB6] bg-opacity-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Marketing Results
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              Our data-driven marketing strategies deliver measurable results
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#016E4E] mb-2">45%</div>
              <p className="text-[#434C54] font-medium">
                Average Increase in Conversion Rate
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#016E4E] mb-2">3.2x</div>
              <p className="text-[#434C54] font-medium">
                Average ROI on Marketing Spend
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#016E4E] mb-2">68%</div>
              <p className="text-[#434C54] font-medium">
                Increase in Organic Traffic
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#016E4E] mb-2">2.5x</div>
              <p className="text-[#434C54] font-medium">
                Average Growth in Social Engagement
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#434C54] mb-6">
            Ready to market your product successfully?
          </h2>
          <p className="text-xl text-[#434C54] mb-8 max-w-3xl mx-auto">
            Let our marketing experts help you reach your target audience and
            drive sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#016E4E] hover:bg-opacity-90 transition-colors">
              Get Started
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 border border-[#434C54] text-base font-medium rounded-md text-[#434C54] bg-white hover:bg-gray-50 transition-colors">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-10 mb-4" />
              <p className="text-gray-400 max-w-xs">
                From concept to market, we're with you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/prototyping" className="text-gray-400 hover:text-white transition-colors">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-white transition-colors">
                      Sourcing & Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-white transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing" className="text-gray-400 hover:text-white transition-colors">
                      Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default MarketingService;