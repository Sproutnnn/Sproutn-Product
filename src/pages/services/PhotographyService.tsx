import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, CameraIcon, ImageIcon, MonitorIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
const PhotographyService: React.FC = () => {
  const packages = [{
    name: 'Standard Package',
    price: '$599',
    description: 'High-quality product shots from multiple angles',
    features: ['7 professional product photos', 'White background', 'Detail shots', 'Digital delivery'],
    popular: false
  }, {
    name: 'Premium Package',
    price: '$899',
    description: 'Complete solution with product shots and promotional video',
    features: ['8 professional product photos', '1 promotional video (15+ seconds)', 'White background', 'Detail shots', 'Digital delivery'],
    popular: true
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
              Product shots
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
              Making you launch ready with professional product shots that drive sales
            </p>
            <a href="https://calendly.com/chris-sproutn/30min" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
            </a>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Photography Services
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              High-quality visual content that showcases your products in their
              best light
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <CameraIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Studio Photography</h3>
              <p className="text-gray-300 mb-4">
                Professional studio shots with clean backgrounds, perfect
                lighting, and expert composition to highlight your product's key
                features and details.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <ImageIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Marketing assets
              </h3>
              <p className="text-gray-300 mb-4">
                Get ahead start on marketing with professional level pictures and assets that are ready for you to use before your products are even delivered to you
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <MonitorIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                E-commerce Optimization
              </h3>
              <p className="text-gray-300 mb-4">
                Images optimized specifically for e-commerce platforms, with
                proper sizing, multiple angles, and detail shots that drive
                higher conversion rates.
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
              Photography Packages
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the package that best showcases your products and fits your
              marketing needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  <a href="https://calendly.com/chris-sproutn/30min" target="_blank" rel="noopener noreferrer" className={`block text-center py-2 px-4 rounded-md font-medium ${pkg.popular ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-charcoal-600 text-gray-300 hover:bg-charcoal-500'} transition-colors`}>
                    Get Started
                  </a>
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
              Our Photography Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A streamlined approach to creating stunning product visuals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            step: '1',
            title: 'Consultation',
            description: 'We discuss your brand, products, and visual goals to plan the perfect photoshoot'
          }, {
            step: '2',
            title: 'Creative Direction',
            description: 'We develop a creative strategy for your product photography aligned with your brand'
          }, {
            step: '3',
            title: 'Professional Shoot',
            description: 'Our photographers capture your products with expert lighting and composition'
          }, {
            step: '4',
            title: 'Editing & Delivery',
            description: 'We professionally edit and optimize your images before delivering the final files'
          }].map((process, index) => <div key={index} className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-primary-900/50 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-300 text-sm">{process.description}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Photography Portfolio
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Examples of our professional product photography work
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-charcoal-600 group">
              <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-charcoal-600 group">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-charcoal-600 group">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-charcoal-600 group">
              <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to showcase your products?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Professional photography can significantly increase your conversion
            rates and customer engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="https://calendly.com/chris-sproutn/30min" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
            </a>
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
export default PhotographyService;