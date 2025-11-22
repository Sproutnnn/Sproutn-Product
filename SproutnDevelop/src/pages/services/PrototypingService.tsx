import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const PrototypingService: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#016E4E] to-[#859CB6] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prototype Your Vision
            </h1>
            <p className="text-xl mb-8">
              Turn your concept into a tangible product by trusting us with
              taking your idea from vision to reality. We help bring your ideas
              to life with precision and expertise.
            </p>
            <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#016E4E] bg-white hover:bg-gray-100 transition-colors">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our Prototyping Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              We follow a structured approach to transform your ideas into
              functional prototypes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            step: '1',
            title: 'Concept Development',
            description: 'We work with you to refine your product concept and create detailed specifications'
          }, {
            step: '2',
            title: 'Physical Prototyping',
            description: 'We build physical prototypes using appropriate materials and manufacturing techniques'
          }, {
            step: '3',
            title: 'Testing & Iteration',
            description: 'We test functionality and gather feedback to refine the prototype until it meets your requirements'
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
      {/* CTA Section */}
      <section className="py-16 bg-[#859CB6] bg-opacity-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#434C54] mb-6">
            Ready to bring your product idea to life?
          </h2>
          <p className="text-xl text-[#434C54] mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your project and get started on your
            prototyping journey.
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
                      Sourcing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/manufacturing" className="text-gray-400 hover:text-white transition-colors">
                      Manufacturing
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
export default PrototypingService;