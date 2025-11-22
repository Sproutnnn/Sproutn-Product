import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, BarChart2Icon, CameraIcon, PackageIcon, TruckIcon, MonitorIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
const LandingPage: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  return <div className="bg-[#1A1E21] w-full min-h-screen text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-6">
            <div className="text-sm text-primary-400 mb-4 font-medium">PLATFORM HOME PAGE</div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              The place where startup ideas come to life
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8 max-w-2xl mx-auto">
              Bring your platform and software ideas from concept to functional
            </h2>
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
                <div className="flex items-center mt-4">
                  <span className="text-green-400">$ import platform idea</span>
                </div>
                <div className="text-gray-300 ml-2 mt-2">
                  <span className="text-green-400">&gt;</span> We'll help you bring it to life cost-effective and fast
                </div>
                <div className="text-gray-300 ml-2 mt-2">
                  <span className="text-green-400">&gt;</span> From UI/UX design to full functionality
                </div>
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
      {/* Our approach Section */}
      <section className="py-20 bg-[#171B1E]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our approach
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your validated concept made it to a fully working solution
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4">
                <PackageIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Project scope
              </h3>
              <p className="text-sm text-gray-400">
                Validate your idea, define the project scope, and outline its key phases
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-4">
                <TruckIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">UI/UX Design</h3>
              <p className="text-sm text-gray-400">
                Design your platform for the best user experience and clean aesthetic
              </p>
            </div>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-4">
                <MonitorIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                User Testing
              </h3>
              <p className="text-sm text-gray-400">
              <p className="text-sm text-gray-400">
                Pressure test the platform design and functionalities with real users
              </p>
            <div className="bg-[#1A1E21] p-6 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 mb-4">
                <CameraIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Production
              </h3>
              <p className="text-sm text-gray-400">
                Professional photography that showcases your products at their
              <p className="text-sm text-gray-400">
                Bring your product's UI to life one phase at a time, with rapid MVP turnarounds
              </p>
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mb-4">
                <BarChart2Icon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Marketing</h3>
              <p className="text-sm text-gray-400">
                Strategic marketing campaigns that connect your products with
                the right customers
              <p className="text-sm text-gray-400">
                Strategic marketing plan that helps you hit the ground running
              </p>
      </section>
      {/* Why do business ideas fail Section */}
      <section className="py-20 bg-[#1A1E21]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why do business ideas fail
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We've identified the key reasons product businesses fail, and
              we're here to address them
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our services are strategically designed to address and prevent the core challenges that lead to startup failure
            </p>
              <p className="text-gray-400">
                fail due to unclear product requirements
              </p>
            </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">42%</div>
              <p className="text-gray-400">
                of projects don't have market demand
              </p>
            </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-purple-400 mb-2">54%</div>
              <p className="text-gray-400">experience a lack of marketing</p>
            </div>
          </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-amber-400 mb-2">39%</div>
              <p className="text-gray-400">
                fail due to poor requirements gathering
              </p>
            </div>
            <div className="bg-[#171B1E] p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-green-400 mb-2">30%</div>
              <p className="text-gray-400">
                fail due to insufficient funding
              </p>
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