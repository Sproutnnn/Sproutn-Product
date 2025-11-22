import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, PencilIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const UiUxDesignService: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#D1CDC2] to-[#a8a49b] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#434C54]">
                UI/UX Design Services
              </h1>
              <p className="text-xl mb-8 text-[#434C54]">
                Create intuitive, engaging user interfaces that delight your
                customers. Our design process focuses on user research,
                wireframing, prototyping, and usability testing.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#434C54] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#434C54] transition-colors">
                  Start Your Project
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-[#434C54] text-base font-medium rounded-md text-[#434C54] hover:bg-[#434C54] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#434C54] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-3">
                  <PencilIcon className="h-16 w-16 text-[#D1CDC2] mb-4" />
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
              Our UI/UX Design Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We create user-centered designs that enhance user satisfaction and
              drive business growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            title: 'User Research',
            description: 'We conduct in-depth research to understand your users, needs, behaviors, and pain points.'
          }, {
            title: 'Information Architecture',
            description: 'We organize and structure your content to create intuitive navigation and user flows.'
          }, {
            title: 'Wireframing & Prototyping',
            description: 'We create interactive prototypes to visualize and test your digital product before development.'
          }, {
            title: 'Visual Design',
            description: 'We craft visually appealing interfaces that align with your brand identity and engage users.'
          }, {
            title: 'Usability Testing',
            description: 'We validate design decisions through user testing to ensure your product meets user expectations.'
          }, {
            title: 'Design Systems',
            description: 'We develop comprehensive design systems to ensure consistency across your digital products.'
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
export default UiUxDesignService;