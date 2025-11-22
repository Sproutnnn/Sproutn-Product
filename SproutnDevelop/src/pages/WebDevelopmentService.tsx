import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, CodeIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
const WebDevelopmentService: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-charcoal-500 to-charcoal-600 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">
                Web Development Services
              </h1>
              <p className="text-xl mb-10 leading-relaxed opacity-90">
                Create powerful, responsive web applications using modern
                frameworks and technologies. We build scalable solutions that
                drive business growth and user engagement.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105 shadow-md">
                  Start Your Project
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-16 md:mt-0">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-2xl p-8 transform rotate-3 transition-transform duration-300 hover:rotate-1">
                  <CodeIcon className="h-20 w-20 text-primary-500 mb-6" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 rounded-full mb-4"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded-full mb-4"></div>
                  <div className="h-4 w-4/6 bg-gray-100 rounded-full"></div>
                </div>
                <div className="absolute top-10 right-10 bg-white rounded-xl shadow-2xl p-8 transform -rotate-6 transition-transform duration-300 hover:-rotate-2">
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 rounded-full mb-4"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-500 mb-6">
              Our Web Development Expertise
            </h2>
            <p className="text-xl text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
              We build modern, responsive web applications that deliver
              exceptional user experiences and drive business results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[{
            title: 'Custom Web Applications',
            description: 'Tailor-made web applications designed to address your specific business needs and challenges.'
          }, {
            title: 'E-commerce Websites',
            description: 'Powerful online stores with seamless checkout processes, payment integrations, and inventory management.'
          }, {
            title: 'Progressive Web Apps',
            description: 'Fast, reliable, and engaging web applications that work offline and provide a native app-like experience.'
          }, {
            title: 'Content Management Systems',
            description: 'Easy-to-use CMS solutions that allow you to manage your website content without technical knowledge.'
          }, {
            title: 'API Development & Integration',
            description: 'Custom API development and third-party integrations to connect your web applications with other systems.'
          }, {
            title: 'Web Application Maintenance',
            description: 'Ongoing support, updates, and optimization to ensure your web applications remain secure and performant.'
          }].map((feature, index) => <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-2 border-primary-500">
                <h3 className="text-xl font-semibold text-charcoal-500 mb-4">
                  {feature.title}
                </h3>
                <p className="text-charcoal-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-500 mb-6">
              Benefits of Our Web Development Services
            </h2>
            <p className="text-xl text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
              Our web development approach is designed to deliver measurable
              business results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {[{
            title: 'Improved User Experience',
            description: 'Intuitive interfaces and smooth navigation that keep users engaged and reduce bounce rates.'
          }, {
            title: 'Increased Conversion Rates',
            description: 'Strategic design and functionality that guide users toward desired actions and boost conversions.'
          }, {
            title: 'Better Performance',
            description: 'Optimized code and infrastructure that ensure fast loading times and smooth operation.'
          }, {
            title: 'Enhanced Security',
            description: 'Robust security measures to protect your data and maintain user trust.'
          }].map((benefit, index) => <div key={index} className="flex items-start p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex-shrink-0 mr-6">
                  <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center shadow-md">
                    <CheckIcon className="h-6 w-6 text-primary-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal-500 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-500 mb-6">
              Our Web Development Process
            </h2>
            <p className="text-xl text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
              We follow a proven methodology to deliver high-quality web
              applications.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[{
            number: '1',
            title: 'Discovery',
            description: 'We analyze your requirements and business goals'
          }, {
            number: '2',
            title: 'Design',
            description: 'We create wireframes and prototypes'
          }, {
            number: '3',
            title: 'Development',
            description: 'We build your web application'
          }, {
            number: '4',
            title: 'Testing',
            description: 'We ensure quality and performance'
          }, {
            number: '5',
            title: 'Deployment',
            description: 'We launch your application'
          }, {
            number: '6',
            title: 'Maintenance',
            description: 'We provide ongoing support'
          }].map((step, index) => <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-charcoal-500 mb-2">
                  {step.title}
                </h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Case Studies Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-500 mb-6">
              Case Studies
            </h2>
            <p className="text-xl text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
              See how our web development services have helped businesses
              succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {[{
            title: 'E-commerce Platform',
            description: 'We built a custom e-commerce platform for a retail client that increased their online sales by 45%.',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
          }, {
            title: 'Healthcare Portal',
            description: 'A patient management system that improved administrative efficiency by 30%.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
          }].map((caseStudy, index) => <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-charcoal-500 mb-4">
                    {caseStudy.title}
                  </h3>
                  <p className="text-charcoal-500 mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>
                  <Link to="/case-studies" className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors duration-200">
                    Read Case Study
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-500 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
              Common questions about our web development services
            </p>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[{
            question: 'How long does it take to develop a web application?',
            answer: 'The timeline varies depending on the complexity of the project. Simple websites can take 2-4 weeks, while complex web applications might take 3-6 months or more.'
          }, {
            question: 'What technologies do you use?',
            answer: 'We primarily use React, Node.js, and other modern JavaScript frameworks. We also work with PHP, Python, and Ruby depending on project requirements.'
          }, {
            question: 'Do you provide ongoing maintenance?',
            answer: 'Yes, we offer various maintenance packages to ensure your web application remains secure, up-to-date, and performs optimally.'
          }, {
            question: 'How do you ensure the quality of your code?',
            answer: 'We implement rigorous quality assurance processes including automated testing, code reviews, and continuous integration to deliver reliable, secure, and maintainable code.'
          }].map((faq, index) => <div key={index} className="py-8">
                <h3 className="text-xl font-medium text-charcoal-500">
                  {faq.question}
                </h3>
                <p className="mt-4 text-charcoal-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to start your web development project?
          </h2>
          <p className="text-xl text-white opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your requirements and create a web solution that
            drives your business forward.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-charcoal-500 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-10 md:mb-0 md:w-1/3">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-12 mb-6" />
              <p className="text-gray-400 max-w-xs leading-relaxed">
                From concept to deployment, we're with you every step of the
                way. Building software that grows your business.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:w-2/3">
              <div>
                <h3 className="text-lg font-semibold mb-6">Services</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/services/web-development" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-software" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Custom Software
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ui-ux-design" className="text-gray-400 hover:text-white transition-colors duration-200">
                      UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/devops-cloud" className="text-gray-400 hover:text-white transition-colors duration-200">
                      DevOps & Cloud
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Company</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Legal</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
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
export default WebDevelopmentService;