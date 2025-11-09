import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlusIcon, MinusIcon, BoxIcon, TruckIcon, Factory, CameraIcon, LineChartIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
const LandingPage: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const faqItems = [{
    question: "How does Sprout'n help with cash flow management?",
    answer: 'We reduce your first order costs from sampling fees to negotiating the best unit price for you. We also give you access to some of the best freight costs on the market and guide you through the entire production process helping you avoid first time mistakes. All this helps maintain better cash flow throughout the first 12-24 months'
  }, {
    question: 'How do you simplify the manufacturing process?',
    answer: 'We handle the complex aspects of manufacturing and logistics by vetting suppliers, negotiating terms, managing quality control, and coordinating shipping. This allows you to focus on other aspects of your business'
  }, {
    question: 'How long does it typically take to bring a product to market?',
    answer: 'While timelines vary based on product complexity, our streamlined process typically reduces time-to-market by 30-40% compared to entrepreneurs navigating the process alone. Most products can go from concept to market in 6-8 months. We help guide you through optimizing your time during manufacturing and delivery phases to ensure you are ready to hit the ground running instantly'
  }, {
    question: 'Can you help with idea validation?',
    answer: 'Absolutely! If after our initial conversation and research we present an unfavorable market opportunity report, we will not encourage you to continue on as a client. Our goal is to stop you from investing unnecessarily in ideas'
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 max-w-7xl mx-auto px-4">
              The place where startup ideas come to life
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Bringing your business ideas from concept to market with less risk
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to={isAuthenticated ? '/create-project' : '/login'} className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/services" className="px-8 py-3 border border-gray-500 text-gray-300 font-medium rounded-md hover:bg-charcoal-700 hover:text-white transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="bg-charcoal-700/70 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 shadow-2xl">
              <div className="relative w-full h-64 md:h-80">
                <img src="/HeroSproutn.svg" alt="Global Supply Chain Network" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -left-4 h-16 bg-gradient-to-t from-charcoal-800 to-transparent z-10"></div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From your first sample to launch ready
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <BoxIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sampling</h3>
              <p className="text-gray-300 mb-4">
                Turning product concepts to tangible samples
              </p>
              <Link to="/services/prototyping" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sourcing</h3>
              <p className="text-gray-300 mb-4">
                Finding you reliable manufacturers suited to your budget and needs
              </p>
              <Link to="/services/sourcing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <Factory className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manufacturing and freight</h3>
              <p className="text-gray-300 mb-4">
                Executing manufacturing and freight logistics ensuring seamless production and delivery
              </p>
              <Link to="/services/manufacturing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <CameraIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Product shots</h3>
              <p className="text-gray-300 mb-4">
                Making you launch ready with professional product shots that drive sales
              </p>
              <Link to="/services/photography" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <LineChartIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing</h3>
              <p className="text-gray-300 mb-4">
                Creating extensive marketing launch plans that promote brand awareness and sales
              </p>
              <Link to="/services/marketing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why do business ideas fail
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our services are strategically designed to address and prevent the core challenges that lead to startup failure
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                82%
              </div>
              <p className="text-gray-300">fail due to cash flow problems</p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                38%
              </div>
              <p className="text-gray-300">
                fail by not having a good business plan
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                14%
              </div>
              <p className="text-gray-300">
                fail because of a lack of marketing
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our process</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A strategic process, adaptable to your pace and needs
            </p>
          </div>
          <div className="space-y-6">
            {[{
            number: '01',
            title: 'Sample your vision',
            description: 'Turn your idea into a physical product with our years of experience'
          }, {
            number: '02',
            title: 'Find the best supplier for you',
            description: "We'll find you three reliable suppliers to choose from that meet your manufacturing and budget requirements"
          }, {
            number: '03',
            title: 'Place bulk orders and have them delivered',
            description: 'Leverage our experience in manufacturing and freight logistics to ensure smooth operations and competitive costs'
          }, {
            number: '04',
            title: 'Showcase your product',
            description: 'Get special pricing on professional product shots based on your own inspiration for your website and marketing assets'
          }, {
            number: '05',
            title: 'Why do business ideas fail',
            description: 'Get an extensive marketing launch plan to successfully introduce your product to the market ensuring your marketing dollars are spent wisely'
          }].map((step, index) => <div key={index} className="flex items-start bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300">
                <div className="text-xl font-bold text-primary-400 mr-6">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              You asked, so we've answered truthfully
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => <div key={index} className="mb-4 bg-charcoal-700/30 backdrop-blur-sm rounded-xl border border-charcoal-600 overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="flex justify-between items-center w-full text-left p-6 focus:outline-none">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span>
                    {openFaqIndex === index ? <MinusIcon className="h-5 w-5 text-primary-400" /> : <PlusIcon className="h-5 w-5 text-primary-400" />}
                  </span>
                </button>
                {openFaqIndex === index && <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>}
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to bring your idea to life?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join the entrepreneurs who are successfully bringing their products
            to market with our help.
          </p>
          <Link to={isAuthenticated ? '/create-project' : '/login'} className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-8 mb-4" />
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
export default LandingPage;