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
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#D1CDC2] to-[#859CB6] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#434C54]">
              Professional Product Photography
            </h1>
            <p className="text-xl mb-8 text-[#434C54]">
              Showcase your products with stunning, professional photography
              that drives conversions. Our expert photographers create
              compelling visual content that helps your products stand out.
            </p>
            <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#016E4E] hover:bg-opacity-90 transition-colors">
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
              Photography Services
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              High-quality visual content that showcases your products in their
              best light
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#D1CDC2] bg-opacity-50 rounded-full flex items-center justify-center mb-4">
                <CameraIcon className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Studio Photography
              </h3>
              <p className="text-[#434C54]">
                Professional studio shots with clean backgrounds, perfect
                lighting, and expert composition to highlight your product's key
                features and details.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#859CB6] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-[#859CB6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Lifestyle Photography
              </h3>
              <p className="text-[#434C54]">
                Contextual photography showing your products in use, helping
                customers visualize how your products fit into their lives and
                enhancing emotional connection.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <MonitorIcon className="h-8 w-8 text-[#016E4E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                E-commerce Optimization
              </h3>
              <p className="text-[#434C54]">
                Images optimized specifically for e-commerce platforms, with
                proper sizing, multiple angles, and detail shots that drive
                higher conversion rates.
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
              Photography Packages
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              Choose the package that best showcases your products and fits your
              marketing needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              Our Photography Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              A streamlined approach to creating stunning product visuals
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
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
          }].map((process, index) => <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#D1CDC2] rounded-full flex items-center justify-center text-[#434C54] text-xl font-bold mb-4">
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
      {/* Portfolio Section */}
      <section className="py-16 bg-[#859CB6] bg-opacity-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our Photography Portfolio
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              Examples of our professional product photography work
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80" alt="Product Photography Example" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#434C54] mb-6">
            Ready to showcase your products?
          </h2>
          <p className="text-xl text-[#434C54] mb-8 max-w-3xl mx-auto">
            Professional photography can significantly increase your conversion
            rates and customer engagement.
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
export default PhotographyService;