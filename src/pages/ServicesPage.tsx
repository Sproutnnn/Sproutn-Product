import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, BoxIcon, TruckIcon, Factory, CameraIcon, LineChartIcon, PencilIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  const services = [{
    id: 'prototyping',
    title: 'Prototyping',
    description: 'Turn your concept into a tangible product by trusting us with taking your idea from vision to reality. We help bring your ideas to life with precision and expertise.',
    icon: <BoxIcon className="h-12 w-12 text-[#016E4E]" />,
    color: '#016E4E',
    path: '/services/prototyping'
  }, {
    id: 'sourcing',
    title: 'Sourcing',
    description: 'Connect with reliable manufacturing partners worldwide. We help you find the perfect suppliers for your product needs while ensuring quality and competitive pricing.',
    icon: <TruckIcon className="h-12 w-12 text-[#859CB6]" />,
    color: '#859CB6',
    path: '/services/sourcing'
  }, {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Transform your product designs into market-ready goods with our comprehensive manufacturing services. We manage the entire production process.',
    icon: <Factory className="h-12 w-12 text-[#434C54]" />,
    color: '#434C54',
    path: '/services/manufacturing'
  }, {
    id: 'photography',
    title: 'Photography',
    description: 'Showcase your products with stunning, professional photography that drives conversions. Our expert photographers create compelling visual content.',
    icon: <CameraIcon className="h-12 w-12 text-[#D1CDC2]" />,
    color: '#D1CDC2',
    path: '/services/photography'
  }, {
    id: 'marketing',
    title: 'Marketing',
    description: 'Launch and grow your product with data-driven marketing strategies. Our marketing experts help you reach your target audience and drive sales.',
    icon: <LineChartIcon className="h-12 w-12 text-[#016E4E]" />,
    color: '#016E4E',
    path: '/services/marketing'
  }];
  const processSteps = [{
    number: '1',
    title: 'Prototype your vision',
    description: 'Turn your concept into a tangible product with our expert prototyping services'
  }, {
    number: '2',
    title: 'Find the best supplier for you',
    description: "We'll match you with reliable suppliers that meet your quality and budget requirements"
  }, {
    number: '3',
    title: 'Manufacture & ship at lower costs',
    description: 'Leverage our network to reduce production costs and streamline shipping'
  }, {
    number: '4',
    title: 'Get professional product shots',
    description: 'Showcase your product with high-quality photography that sells'
  }, {
    number: '5',
    title: 'Plan your marketing launch',
    description: 'Create a strategic marketing plan to successfully introduce your product to the market'
  }];
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#434C54] to-charcoal-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Comprehensive product development and launch services to help
                you bring your ideas to market successfully.
              </p>
            </div>
            {isAdmin && <button onClick={() => navigate('/admin/pages/edit/services')} className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <PencilIcon className="h-5 w-5" />
              </button>}
          </div>
        </div>
      </section>
      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`h-2 bg-[${service.color}]`} style={{
              backgroundColor: service.color
            }}></div>
                <div className="p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-[#434C54] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#434C54] mb-6">{service.description}</p>
                  <Link to={service.path} className="inline-flex items-center text-[#016E4E] font-medium hover:underline">
                    Learn More
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-16 bg-[#D1CDC2] bg-opacity-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4">
              Our End-to-End Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              We guide you through every step of the product development journey
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center text-[#016E4E] text-xl font-bold mb-4">
                  {step.number}
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
            Ready to bring your product to market?
          </h2>
          <p className="text-xl text-white text-opacity-80 mb-8 max-w-3xl mx-auto">
            Let us help you navigate the complex journey from concept to
            successful product launch.
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
export default ServicesPage;