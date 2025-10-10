import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const PrototypingService: React.FC = () => {
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
              Prototype Your Vision
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
              Turn your concept into a tangible product with precision and
              expertise. We bring your ideas to life.
            </p>
            <Link to="/login" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Prototyping Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We follow a structured approach to transform your ideas into
              functional prototypes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4 flex items-center justify-center w-12 h-12 bg-primary-900/30 rounded-full">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Concept Development
              </h3>
              <p className="text-gray-300 mb-4">
                We work with you to refine your product concept and create
                detailed specifications
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4 flex items-center justify-center w-12 h-12 bg-primary-900/30 rounded-full">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Physical Prototyping
              </h3>
              <p className="text-gray-300 mb-4">
                We build physical prototypes using appropriate materials and
                manufacturing techniques
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4 flex items-center justify-center w-12 h-12 bg-primary-900/30 rounded-full">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Testing & Iteration
              </h3>
              <p className="text-gray-300 mb-4">
                We test functionality and gather feedback to refine the
                prototype until it meets your requirements
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prototyping Benefits
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Why professional prototyping is essential for product success
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">
                Validate Your Concept
              </h3>
              <p className="text-gray-300">
                Test your product idea with a physical prototype before
                investing in full production, reducing financial risk and
                ensuring market fit.
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">
                Attract Investors
              </h3>
              <p className="text-gray-300">
                A professional prototype demonstrates your commitment and
                provides tangible evidence of your concept, making it easier to
                secure funding.
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">
                Optimize for Manufacturing
              </h3>
              <p className="text-gray-300">
                Identify and resolve potential production issues early,
                streamlining the manufacturing process and reducing costs.
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">
                Patent Protection
              </h3>
              <p className="text-gray-300">
                A detailed prototype strengthens your intellectual property
                claims and helps secure patents for your unique innovations.
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
            Ready to bring your product idea to life?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Contact us today to discuss your project and get started on your
            prototyping journey.
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
export default PrototypingService;