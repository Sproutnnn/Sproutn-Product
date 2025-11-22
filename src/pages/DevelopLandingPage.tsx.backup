import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlusIcon, MinusIcon, CheckIcon, BarChart2Icon, CameraIcon, PackageIcon, TruckIcon, MonitorIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
const LandingPage: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const faqItems = [{
    question: "How does Sprout'n help with software project budgeting?",
    answer: 'We provide transparent pricing models and flexible engagement options to fit your budget constraints. Our agile development approach ensures you only pay for the features you need, when you need them.'
  }, {
    question: 'Can you help me develop a technical roadmap for my software?',
    answer: 'Absolutely! We work with you to create a comprehensive technical roadmap that includes architecture planning, feature prioritization, technology selection, and scalability considerations to ensure long-term success.'
  }, {
    question: 'What support do you provide after launching my software?',
    answer: 'Our support services include maintenance packages, performance monitoring, security updates, feature enhancements, and technical support. We ensure your software remains secure, up-to-date, and optimized for performance.'
  }, {
    question: 'How do you ensure the quality of the software you develop?',
    answer: 'We implement rigorous quality assurance processes including automated testing, code reviews, continuous integration, and user acceptance testing. Our development practices follow industry standards to deliver reliable, secure, and maintainable code.'
  }, {
    question: 'How long does it typically take to develop a software project?',
    answer: 'While timelines vary based on project complexity, our agile development approach typically delivers initial versions in 2-3 months, with continuous improvements thereafter. We provide clear milestones and regular updates throughout the development process.'
  }];
  return <div className="bg-[#1A1E21] w-full min-h-screen text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Grow your ideas into reality
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              We make your journey from concept to market smoother, faster, and
              more successful.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-[#1A1E21] bg-primary-400 hover:bg-primary-300 focus:outline-none">
                Get Started
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-600 text-sm font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none">
                Learn More
              </Link>
            </div>
            <div className="max-w-2xl mx-auto bg-[#1A1E21] rounded-lg shadow-lg overflow-hidden border border-gray-800">
              <div className="flex items-center px-4 py-2 bg-[#171B1E] border-b border-gray-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-green-400">
                  $ Tell us about your product idea
                </div>
                <div className="text-gray-300 ml-2 mt-2">
                  <span className="text-green-400">&gt;</span> We'll help you
                  bring it to life - from prototype to market
                </div>
                <div className="text-gray-300 ml-2 mt-2">
                  <span className="text-green-400">&gt;</span> Our experts
                  handle manufacturing, logistics, and marketing
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-400">$</span>
                  <span className="ml-2 w-2 h-5 bg-green-400 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Services Section */}
      <section className="py-20 bg-[#171B1E]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From concept to market, we'll guide you every step of the way
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4">
                <PackageIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Prototyping
              </h3>
              <p className="text-sm text-gray-400">
                Transform your ideas into tangible products with professional
                prototyping services
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-4">
                <TruckIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Sourcing</h3>
              <p className="text-sm text-gray-400">
                We connect you with reliable manufacturing partners worldwide to
                produce your product
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-4">
                <MonitorIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Web/Software
              </h3>
              <p className="text-sm text-gray-400">
                Custom software solutions that streamline operations and enhance
                your digital presence
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 mb-4">
                <CameraIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Photography
              </h3>
              <p className="text-sm text-gray-400">
                Professional photography that showcases your products at their
                very best
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mb-4">
                <BarChart2Icon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Marketing</h3>
              <p className="text-sm text-gray-400">
                Strategic marketing campaigns that connect your products with
                the right customers
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why businesses fail Section */}
      <section className="py-20 bg-[#1A1E21]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why businesses fail
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We've identified the key reasons product businesses fail, and
              we're here to address them
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-teal-400 mb-2">82%</div>
              <p className="text-gray-400">
                fail due to unclear product requirements
              </p>
            </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">38%</div>
              <p className="text-gray-400">
                struggle with finding a good business model
              </p>
            </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-purple-400 mb-2">54%</div>
              <p className="text-gray-400">experience a lack of marketing</p>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 bg-[#171B1E]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We take your idea through validated solutions tailored to your
              goals
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 flex-shrink-0">
                  <span className="text-sm font-medium">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Prototype your vision
                  </h3>
                  <p className="text-sm text-gray-400">
                    We turn your rough product ideas into expert functioning
                    prototypes.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                  <span className="text-sm font-medium">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Find the best supplier for you
                  </h3>
                  <p className="text-sm text-gray-400">
                    We match you with reliable suppliers that meet your quality,
                    budget, and margin requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0">
                  <span className="text-sm font-medium">03</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Manufacture & Ship at your scale
                  </h3>
                  <p className="text-sm text-gray-400">
                    From sample production to full-scale manufacturing and
                    worldwide shipping.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 flex-shrink-0">
                  <span className="text-sm font-medium">04</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Get professional product shots
                  </h3>
                  <p className="text-sm text-gray-400">
                    Showcase your product with high-quality photography that
                    sells.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 flex-shrink-0">
                  <span className="text-sm font-medium">05</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Plan your marketing launch
                  </h3>
                  <p className="text-sm text-gray-400">
                    Create a comprehensive marketing plan to successfully
                    introduce your product to the market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-[#1A1E21]">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Get answers to common questions about how we help businesses
              succeed
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq, index) => <div key={index} className="bg-[#1E2428] rounded-lg overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="flex justify-between items-center w-full text-left p-6 focus:outline-none">
                  <h3 className="text-lg font-medium text-white">
                    {faq.question}
                  </h3>
                  <span className="ml-4 flex-shrink-0">
                    {openFaqIndex === index ? <MinusIcon className="h-6 w-6 text-primary-400" /> : <PlusIcon className="h-6 w-6 text-primary-400" />}
                  </span>
                </button>
                {openFaqIndex === index && <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>}
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to bring your product idea to life?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join the businesses who are successfully launching their products
            with our help.
          </p>
          <Link to={isAuthenticated ? '/create-project' : '/login'} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-100 focus:outline-none">
            Start your project
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#171B1E] py-12 border-t border-gray-800">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0 md:w-1/3">
              <img src="/IMG_8337_copy.png" alt="Sprout'n Logo" className="h-8 mb-4" />
              <p className="text-gray-400 max-w-xs text-sm">
                From concept to market, we're with you every step of the way.
                Building products that grow your business.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Connect
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:contact@sproutn.com" className="text-gray-400 hover:text-white text-sm">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/sproutn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default LandingPage;