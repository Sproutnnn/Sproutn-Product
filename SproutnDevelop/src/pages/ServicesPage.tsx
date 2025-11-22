import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CodeIcon, ServerIcon, CloudIcon, PencilIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  const services = [{
    id: 'web-development',
    title: 'Web Development',
    description: 'Create powerful, responsive web applications using modern frameworks and technologies. We build scalable solutions that drive business growth and user engagement.',
    icon: <CodeIcon className="h-12 w-12 text-[#016E4E]" />,
    color: '#016E4E',
    path: '/services/web-development'
  }, {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Develop tailor-made software solutions that address your unique business challenges. We create custom applications that streamline operations and boost efficiency.',
    icon: <ServerIcon className="h-12 w-12 text-[#434C54]" />,
    color: '#434C54',
    path: '/services/custom-software'
  }, {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Create intuitive, engaging user interfaces that delight your customers. Our design process focuses on user research, wireframing, prototyping, and usability testing.',
    icon: <div className="h-12 w-12 text-[#D1CDC2]" />,
    color: '#D1CDC2',
    path: '/services/ui-ux-design'
  }, {
    id: 'devops-cloud',
    title: 'DevOps & Cloud',
    description: 'Optimize your development pipeline and cloud infrastructure for performance, security, and scalability. We implement CI/CD, containerization, and cloud-native solutions.',
    icon: <CloudIcon className="h-12 w-12 text-[#016E4E]" />,
    color: '#016E4E',
    path: '/services/devops-cloud'
  }];
  const processSteps = [{
    number: '1',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements and create a detailed roadmap for your software project'
  }, {
    number: '2',
    title: 'Design & Architecture',
    description: 'Our experts design intuitive interfaces and robust technical architecture'
  }, {
    number: '3',
    title: 'Development & Testing',
    description: 'We build your solution with clean code and comprehensive testing'
  }, {
    number: '4',
    title: 'Deployment & Integration',
    description: 'We deploy your software and ensure seamless integration with existing systems'
  }, {
    number: '5',
    title: 'Maintenance & Evolution',
    description: 'We provide ongoing support and continuously improve your software'
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
                Comprehensive software development services to help you build
                powerful digital solutions that drive business growth.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
              Our Development Process
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto">
              We guide you through every step of the software development
              lifecycle
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
            Ready to transform your business with custom software?
          </h2>
          <p className="text-xl text-white text-opacity-80 mb-8 max-w-3xl mx-auto">
            Let us help you navigate the complex journey from concept to
            successful software launch.
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
export default ServicesPage;