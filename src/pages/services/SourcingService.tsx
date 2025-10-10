import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, GlobeIcon, ShieldCheckIcon, TruckIcon, PencilIcon, Factory, PackageIcon, ClipboardCheckIcon, AwardIcon, UsersIcon, BarChartIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { useAuth } from '../../context/AuthContext';
const SourcingService: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  return <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen w-full text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-charcoal-800/50 z-0"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-start">
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Sourcing & Manufacturing
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
                Connect with reliable manufacturing partners worldwide. Get
                quality products at competitive prices with our expert sourcing
                services.
              </p>
              <Link to="/login" className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
            {isAdmin && <button onClick={() => navigate('/admin/pages/edit/services-sourcing')} className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <PencilIcon className="h-5 w-5" />
              </button>}
          </div>
        </div>
      </section>
      {/* Sourcing Benefits Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Trust Us to Choose Your Manufacturer
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We leverage our global network and industry expertise to connect
              you with the right manufacturing partners
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <GlobeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Manufacturing Options
              </h3>
              <p className="text-gray-300 mb-4">
                We provide you three of the best manufacturing options for your
                idea. Making sure it makes sense from a financial, MOQ, and
                quality perspective.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-300 mb-4">
                We thoroughly vet all potential suppliers, reviewing their
                production capabilities, quality control processes, and business
                practices to ensure reliability.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Logistics Support</h3>
              <p className="text-gray-300 mb-4">
                Our team handles complex shipping logistics, customs
                documentation, and delivery coordination, ensuring your products
                arrive on time and in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Success Stories Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See how we've helped entrepreneurs like you navigate the
              manufacturing journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="flex items-center justify-center mb-4">
                <AwardIcon className="h-12 w-12 text-primary-400" />
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Eco-Friendly Packaging
              </h3>
              <p className="text-gray-300 mb-4">
                "Sprout'n helped us find a manufacturer that could produce our
                sustainable packaging at a price point that worked for our
                budget. Their expertise saved us months of research and
                prevented costly mistakes."
              </p>
              <p className="text-primary-400 font-medium">
                — Emma L., Founder of GreenWrap
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="flex items-center justify-center mb-4">
                <UsersIcon className="h-12 w-12 text-primary-400" />
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Kitchen Gadget Innovation
              </h3>
              <p className="text-gray-300 mb-4">
                "The team at Sprout'n negotiated better terms with our
                manufacturer than we could have on our own. Their connections
                and experience were invaluable in scaling our production."
              </p>
              <p className="text-primary-400 font-medium">
                — Marcus T., CEO of KitchenRevolution
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="flex items-center justify-center mb-4">
                <BarChartIcon className="h-12 w-12 text-primary-400" />
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Fitness Equipment Startup
              </h3>
              <p className="text-gray-300 mb-4">
                "From sourcing materials to quality control, Sprout'n handled
                everything. We were able to launch our product line 40% faster
                than our initial timeline."
              </p>
              <p className="text-primary-400 font-medium">
                — Sophia K., Founder of FitTech
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/login" className="inline-flex items-center text-primary-400 font-medium hover:underline">
              Read more success stories
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Manufacturing Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Manufacturing Expertise
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We handle the entire production process so you can focus on
              growing your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <Factory className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Production Management
              </h3>
              <p className="text-gray-300 mb-4">
                We oversee the entire manufacturing process, from initial setup
                to final production, ensuring your specifications are met with
                precision.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <ClipboardCheckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
              <p className="text-gray-300 mb-4">
                Our rigorous quality control protocols ensure that every product
                meets your standards before shipping, reducing defects and
                returns.
              </p>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <PackageIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Packaging & Fulfillment
              </h3>
              <p className="text-gray-300 mb-4">
                We coordinate custom packaging design and production, as well as
                fulfillment services to get your products to customers
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our End-to-End Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A structured approach from sourcing to manufacturing completion
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[{
            step: '1',
            title: 'Requirements Analysis',
            description: 'We analyze your product specifications, quantity needs, and budget constraints'
          }, {
            step: '2',
            title: 'Supplier Identification',
            description: 'We identify potential suppliers that match your specific requirements'
          }, {
            step: '3',
            title: 'Vetting & Negotiation',
            description: 'We thoroughly vet suppliers and negotiate terms and pricing'
          }, {
            step: '4',
            title: 'Sample Production',
            description: 'We coordinate sample production and review quality'
          }, {
            step: '5',
            title: 'Manufacturing',
            description: 'We oversee the full production run with regular quality checks'
          }, {
            step: '6',
            title: 'Shipping & Delivery',
            description: 'We coordinate shipping logistics for on-time delivery'
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
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your manufacturing journey?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Let us help you navigate the complex world of global sourcing and
            manufacturing to bring your product to life.
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
export default SourcingService;