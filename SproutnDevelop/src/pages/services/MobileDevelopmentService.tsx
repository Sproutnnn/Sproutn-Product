import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, SmartphoneIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const MobileDevelopmentService: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#859CB6] to-[#5a6b80] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mobile Development Services
              </h1>
              <p className="text-xl mb-8">
                Build native and cross-platform mobile apps that deliver
                exceptional user experiences. Our mobile solutions work
                flawlessly across iOS and Android devices.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#859CB6] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors">
                  Start Your Project
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-3">
                  <SmartphoneIcon className="h-16 w-16 text-[#859CB6] mb-4" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>
                <div className="absolute top-6 right-6 bg-white rounded-lg shadow-xl p-6 transform -rotate-6">
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our Mobile Development Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We build intuitive, high-performance mobile applications that
              users love and businesses rely on.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            title: 'Native iOS Development',
            description: 'Custom iOS applications built with Swift to provide the best performance and user experience for Apple devices.'
          }, {
            title: 'Native Android Development',
            description: 'Tailored Android applications developed with Kotlin that take full advantage of the Android ecosystem.'
          }, {
            title: 'Cross-Platform Solutions',
            description: 'Efficient applications that work on both iOS and Android from a single codebase using React Native.'
          }, {
            title: 'Mobile App UI/UX Design',
            description: 'Intuitive, engaging interfaces designed specifically for mobile users and various screen sizes.'
          }, {
            title: 'App Store Optimization',
            description: 'Strategic approaches to improve your app visibility, conversion rates, the App Store, and Google Play.'
          }, {
            title: 'Mobile App Maintenance',
            description: 'Ongoing support, updates, and optimization to ensure your mobile applications remain compatible with new OS versions.'
          }].map((feature, index) => <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                {' '}
                // [FIXME TS1381] L35:13 S1 - Unexpected token. Did you mean `
                {'}'}` or `&rbrace;`?
                <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                  {' '}
                  // [FIXME TS1382] L36:33 S1 - Unexpected token. Did you mean `
                  {'>'}` or `&gt;`?
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>)}
          </div>
        </div>{' '}
      </section>
      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-10 mb-4" />
              <p className="text-gray-400 max-w-xs">
                From concept to deployment, we're with you every step of the
                way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/web-development" className="text-gray-400 hover:text-white transition-colors">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/mobile-development" className="text-gray-400 hover:text-white transition-colors">
                      Mobile Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-software" className="text-gray-400 hover:text-white transition-colors">
                      Custom Software
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ui-ux-design" className="text-gray-400 hover:text-white transition-colors">
                      UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/devops-cloud" className="text-gray-400 hover:text-white transition-colors">
                      DevOps & Cloud
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
export default MobileDevelopmentService;