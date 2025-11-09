import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HeartIcon, LightbulbIcon, TrendingUpIcon, GlobeIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
const About: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-white text-[#434C54] py-20 border-b border-gray-100 animate-fadeIn">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slideUp">
              The mission
            </h1>
            <p className="text-xl mb-8 animate-slideUp animation-delay-200">
              Empower people to act on their ideas. Make them trust themselves enough to take the jump and avoid a life of regret. We are obsessed with making your dreams come to life
            </p>
          </div>
        </div>
      </section>
      {/* Origin Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2 className="text-3xl font-bold text-[#434C54] mb-6 text-center animate-slideUp">
                Where it all started
              </h2>
              <div className="animate-fadeIn animation-delay-200">
                <p className="text-lg text-[#434C54] mb-6">
                  The simplest of answers. Two good friends who've known each other their entire lives and wanted more.
                </p>
                <p className="text-lg text-[#434C54] mb-6">
                  We've always shared that drive to build, create, and push boundaries. But along the way, we realized something important: the game isn't really set up for people to succeed. The systems, the access, the knowledge — it's all harder to reach than it should be. And we wanted to change that.
                </p>
                <p className="text-lg text-[#434C54] mb-6">
                  Over the years, we learned how to talk to manufacturers the right way, how to understand what markets actually want, and how to build real connections that make things happen. Bit by bit, we built a network and a foundation that turned lessons into opportunities.
                </p>
                <p className="text-lg text-[#434C54] mb-6">
                  From the beginning, we kept asking ourselves one simple question: "Why aren't more people doing this?" That question stuck with us.
                </p>
                <p className="text-lg text-[#434C54] mb-6">
                  What started as our own pursuit for "more" became something bigger — a pursuit to help others chase theirs.
                </p>
                <p className="text-lg text-[#434C54] mb-6">
                  And that's how Sprout'n was born. Out of friendship, frustration, curiosity — and the belief that success shouldn't be out of reach for anyone willing to go after it.
                </p>
              </div>
              <div className="my-12 bg-gray-50 p-8 rounded-lg border-l-4 border-[#016E4E] animate-slideIn animation-delay-400">
                <p className="text-xl italic text-[#434C54]">
                  "For us, it has always been about rooting our success in that of others and I think that's something that makes us super unique."
                </p>
                <p className="text-right font-medium text-[#016E4E] mt-4">
                  — Jared, Co-Founder
                </p>
              </div>
              <div className="my-12 bg-gray-50 p-8 rounded-lg border-l-4 border-[#016E4E] animate-slideIn animation-delay-600">
                <p className="text-xl italic text-[#434C54]">
                  "I think the obsession with providing people with opportunities they didn't think possible is probably the aspect that excites me the most. We just want to see everyone live out their dreams."
                </p>
                <p className="text-right font-medium text-[#016E4E] mt-4">
                  — Chris, Co-Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#434C54] mb-4 animate-slideUp">
              What guides us
            </h2>
            <p className="text-lg text-[#434C54] max-w-3xl mx-auto animate-slideUp animation-delay-200">
              Simple beliefs that put the people who trust us at the core of it all
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition duration-300 hover:scale-105 hover:shadow-md animate-fadeIn animation-delay-300">
              <div className="w-16 h-16 bg-[#016E4E] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-opacity-20">
                <HeartIcon className="h-8 w-8 text-[#016E4E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                Do it for their success
              </h3>
              <p className="text-[#434C54]">
                Decisions are made with the success of the client and their ideas in mind
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition duration-300 hover:scale-105 hover:shadow-md animate-fadeIn animation-delay-400">
              <div className="w-16 h-16 bg-[#859CB6] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-opacity-20">
                <LightbulbIcon className="h-8 w-8 text-[#859CB6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                Both sides challenge
              </h3>
              <p className="text-[#434C54]">
                Challenge the way of thinking and open the floor for feedback
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition duration-300 hover:scale-105 hover:shadow-md animate-fadeIn animation-delay-500">
              <div className="w-16 h-16 bg-[#D1CDC2] bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-opacity-70">
                <TrendingUpIcon className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                Encourage mistakes
              </h3>
              <p className="text-[#434C54]">
                Mistakes don't mean failure, in fact failure breeds success
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition duration-300 hover:scale-105 hover:shadow-md animate-fadeIn animation-delay-600">
              <div className="w-16 h-16 bg-[#434C54] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-opacity-20">
                <GlobeIcon className="h-8 w-8 text-[#434C54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#434C54] mb-2">
                Embrace obstacles
              </h3>
              <p className="text-[#434C54]">
                Hurdling over obstacles creates innovation and leads to excellence
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#434C54] mb-6 animate-slideUp">
            Ready to join our success story?
          </h2>
          <p className="text-xl text-[#434C54] mb-8 max-w-3xl mx-auto animate-slideUp animation-delay-200">
            Let us help you turn your product idea into a market success.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#016E4E] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E] transition-colors duration-200 transform hover:scale-105 animate-fadeIn animation-delay-400">
            Start Your Journey
            <ArrowRightIcon className="ml-2 h-5 w-5 animate-bounce animation-delay-1000" />
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
export default About;