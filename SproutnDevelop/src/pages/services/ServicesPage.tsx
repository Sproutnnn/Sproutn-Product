import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const ServicesPage: React.FC = () => {
  const services = [{
    id: 'prototyping',
    title: 'Prototyping',
    description: 'Turn your concept into a tangible product with our expert prototyping services.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    color: '#016E4E',
    link: '/services/prototyping'
  }, {
    id: 'sourcing',
    title: 'Sourcing',
    description: 'We connect you with vetted, reliable suppliers that match your product requirements.',
    image: 'https://images.unsplash.com/photo-1581092335397-9fa73e7d0d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    color: '#859CB6',
    link: '/services/sourcing'
  }, {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'We manage your entire production process from initial manufacturing to final delivery.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    color: '#434C54',
    link: '/services/manufacturing'
  }, {
    id: 'photography',
    title: 'Photography',
    description: 'Showcase your products with high-quality photography that captures attention and drives sales.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    color: '#D1CDC2',
    link: '/services/photography'
  }, {
    id: 'marketing',
    title: 'Marketing',
    description: 'Develop a comprehensive marketing strategy that builds awareness and drives sales.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    color: '#016E4E',
    link: '/services/marketing'
  }];
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#434C54] to-[#859CB6] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl mb-8">
              From concept to market, we provide end-to-end services to help
              entrepreneurs bring their product ideas to life.
            </p>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6 flex-grow" style={{
              borderTop: `4px solid ${service.color}`
            }}>
                  <h3 className="text-2xl font-bold text-[#434C54] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#434C54] mb-6">{service.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <Link to={service.link} className="inline-flex items-center text-[#016E4E] font-medium hover:underline">
                    Learn More
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Process Overview */}
      <section className="py-16 bg-[#D1CDC2] bg-opacity-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our End-to-End Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              We provide a seamless journey from initial concept to market
              success
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[{
            step: '1',
            title: 'Prototype',
            description: 'Turn your concept into a tangible product with our expert prototyping services'
          }, {
            step: '2',
            title: 'Source',
            description: 'Find the perfect manufacturing partners for your specific product needs'
          }, {
            step: '3',
            title: 'Manufacture',
            description: 'Produce high-quality products at scale with rigorous quality control'
          }, {
            step: '4',
            title: 'Photograph',
            description: 'Showcase your product with professional photography that sells'
          }, {
            step: '5',
            title: 'Market',
            description: 'Launch your product with a comprehensive marketing strategy'
          }].map((step, index) => <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#016E4E] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#434C54]">{step.description}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-[#016E4E]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to bring your product idea to life?
          </h2>
          <p className="text-xl text-white text-opacity-80 mb-8 max-w-3xl mx-auto">
            Get started today and let us help you navigate the journey from
            concept to market.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-[#016E4E] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200">
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-10 mb-4" />
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
export default ServicesPage;