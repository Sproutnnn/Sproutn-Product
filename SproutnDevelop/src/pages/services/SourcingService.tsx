import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, GlobeIcon, ShieldCheckIcon, TruckIcon, PencilIcon, Factory, PackageIcon, ClipboardCheckIcon, AwardIcon, UsersIcon, BarChartIcon, HeartIcon } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { useAuth } from '../../context/AuthContext';
const SourcingService: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#859CB6] to-[#434C54] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slideUp">
                Sourcing & Manufacturing
              </h1>
              <p className="text-xl mb-8 animate-slideUp animation-delay-200">
                We connect you with reliable manufacturing partners worldwide
                and manage your production process from start to finish. Get
                quality products at competitive prices with our expert sourcing
                and manufacturing services.
              </p>
              <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#434C54] bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-400">
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5 animate-bounce animation-delay-1000" />
              </Link>
            </div>
            {isAdmin && <button onClick={() => navigate('/admin/pages/edit/services-sourcing')} className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <PencilIcon className="h-5 w-5" />
              </button>}
          </div>
        </div>
      </section>
      {/* Sourcing Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4 animate-slideUp">
              Why Trust Us to Choose Your Manufacturer
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto animate-slideUp animation-delay-200">
              We leverage our global network and industry expertise to connect
              you with the right manufacturing partners
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-300">
              <div className="w-16 h-16 bg-[#859CB6] bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-20">
                <GlobeIcon className="h-8 w-8 text-[#859CB6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Manufacturing Options
              </h3>
              <p className="text-[#434C54]">
                We provide you three of the best manufacturing options for your
                idea. Making sure it makes sense from a financial, MOQ, and
                quality perspective.
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-400">
              <div className="w-16 h-16 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-20">
                <ShieldCheckIcon className="h-8 w-8 text-[#016E4E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Quality Assurance
              </h3>
              <p className="text-[#434C54]">
                We thoroughly vet all potential suppliers, reviewing their
                production capabilities, quality control processes, and business
                practices to ensure reliability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-500">
              <div className="w-16 h-16 bg-[#D1CDC2] bg-opacity-50 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-70">
                <TruckIcon className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Logistics Support
              </h3>
              <p className="text-[#434C54]">
                Our team handles complex shipping logistics, customs
                documentation, and delivery coordination, ensuring your products
                arrive on time and in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* New Section: Success Stories */}
      <section className="py-16 bg-[#016E4E] bg-opacity-5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4 animate-slideUp">
              Success Stories
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto animate-slideUp animation-delay-200">
              See how we've helped entrepreneurs like you navigate the
              manufacturing journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-lg animate-fadeIn animation-delay-300">
              <div className="h-40 bg-[#859CB6] bg-opacity-20 flex items-center justify-center">
                <AwardIcon className="h-16 w-16 text-[#859CB6]" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#434C54] mb-2">
                  Eco-Friendly Packaging
                </h3>
                <p className="text-[#434C54] mb-4">
                  "Sprout'n helped us find a manufacturer that could produce our
                  sustainable packaging at a price point that worked for our
                  budget. Their expertise saved us months of research and
                  prevented costly mistakes."
                </p>
                <p className="text-[#016E4E] font-medium">
                  — Emma L., Founder of GreenWrap
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-lg animate-fadeIn animation-delay-400">
              <div className="h-40 bg-[#016E4E] bg-opacity-10 flex items-center justify-center">
                <UsersIcon className="h-16 w-16 text-[#016E4E]" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#434C54] mb-2">
                  Kitchen Gadget Innovation
                </h3>
                <p className="text-[#434C54] mb-4">
                  "The team at Sprout'n negotiated better terms with our
                  manufacturer than we could have on our own. Their connections
                  and experience were invaluable in scaling our production."
                </p>
                <p className="text-[#016E4E] font-medium">
                  — Marcus T., CEO of KitchenRevolution
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-lg animate-fadeIn animation-delay-500">
              <div className="h-40 bg-[#D1CDC2] bg-opacity-30 flex items-center justify-center">
                <BarChartIcon className="h-16 w-16 text-[#434C54]" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#434C54] mb-2">
                  Fitness Equipment Startup
                </h3>
                <p className="text-[#434C54] mb-4">
                  "From sourcing materials to quality control, Sprout'n handled
                  everything. We were able to launch our product line 40% faster
                  than our initial timeline."
                </p>
                <p className="text-[#016E4E] font-medium">
                  — Sophia K., Founder of FitTech
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10 animate-fadeIn animation-delay-600">
            <Link to="/login" className="inline-flex items-center text-[#016E4E] font-medium hover:underline">
              Read more success stories
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Manufacturing Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4 animate-slideUp">
              Our Manufacturing Expertise
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto animate-slideUp animation-delay-200">
              We handle the entire production process so you can focus on
              growing your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-300">
              <div className="w-16 h-16 bg-[#434C54] bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-20">
                <Factory className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Production Management
              </h3>
              <p className="text-[#434C54]">
                We oversee the entire manufacturing process, from initial setup
                to final production, ensuring your specifications are met with
                precision.
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-400">
              <div className="w-16 h-16 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-20">
                <ClipboardCheckIcon className="h-8 w-8 text-[#016E4E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Quality Control
              </h3>
              <p className="text-[#434C54]">
                Our rigorous quality control protocols ensure that every product
                meets your standards before shipping, reducing defects and
                returns.
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn animation-delay-500">
              <div className="w-16 h-16 bg-[#859CB6] bg-opacity-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-opacity-30">
                <PackageIcon className="h-8 w-8 text-[#859CB6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-3">
                Packaging & Fulfillment
              </h3>
              <p className="text-[#434C54]">
                We coordinate custom packaging design and production, as well as
                fulfillment services to get your products to customers
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Combined Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4 animate-slideUp">
              Our End-to-End Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto animate-slideUp animation-delay-200">
              A structured approach from sourcing to manufacturing completion
            </p>
          </div>
          <div className="grid md:grid-cols-6 gap-6">
            {[{
            step: '1',
            title: 'Requirements Analysis',
            description: 'We analyze your product specifications, quantity needs, quality requirements, and budget constraints'
          }, {
            step: '2',
            title: 'Supplier Identification',
            description: 'We identify and contact potential suppliers that match your specific requirements'
          }, {
            step: '3',
            title: 'Vetting & Negotiation',
            description: 'We thoroughly vet suppliers and negotiate terms, pricing, and production timelines'
          }, {
            step: '4',
            title: 'Sample Production',
            description: 'We coordinate sample production and review quality before proceeding to full production'
          }, {
            step: '5',
            title: 'Manufacturing',
            description: 'We oversee the full production run with regular quality checks and progress updates'
          }, {
            step: '6',
            title: 'Shipping & Delivery',
            description: 'We coordinate shipping logistics and ensure your products arrive safely and on time'
          }].map((process, index) => <div key={index} className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 animate-fadeIn" style={{
            animationDelay: `${300 + index * 100}ms`
          }}>
                <div className="w-12 h-12 bg-[#859CB6] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 transition-all duration-300 hover:shadow-md">
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
          <h2 className="text-3xl font-bold text-[#434C54] mb-6 animate-slideUp">
            Ready to start your manufacturing journey?
          </h2>
          <p className="text-xl text-[#434C54] mb-8 max-w-3xl mx-auto animate-slideUp animation-delay-200">
            Let us help you navigate the complex world of global sourcing and
            manufacturing to bring your product to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#016E4E] hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-400">
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 animate-bounce animation-delay-1000" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 border border-[#434C54] text-base font-medium rounded-md text-[#434C54] bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-500">
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
export default SourcingService;