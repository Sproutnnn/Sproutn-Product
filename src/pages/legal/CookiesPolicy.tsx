import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
const CookiesPolicy: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      <div className="bg-[#859CB6] bg-opacity-10 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#434C54] text-center">
            Cookies Policy
          </h1>
          <p className="text-center text-[#434C54] mt-4">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a
            website you visit. A cookie file is stored in your web browser and
            allows the Service or a third-party to recognize you and make your
            next visit easier and the Service more useful to you.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies
            remain on your personal computer or mobile device when you go
            offline, while session cookies are deleted as soon as you close your
            web browser.
          </p>
          <h2>2. How We Use Cookies</h2>
          <p>
            When you use and access the Service, we may place a number of cookie
            files in your web browser.
          </p>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>
              To enable advertisements delivery, including behavioral
              advertising
            </li>
          </ul>
          <p>
            We use both session and persistent cookies on the Service and we use
            different types of cookies to run the Service:
          </p>
          <ul>
            <li>
              <strong>Essential cookies.</strong> We may use essential cookies
              to authenticate users and prevent fraudulent use of user accounts.
            </li>
            <li>
              <strong>Preferences cookies.</strong> We may use preferences
              cookies to remember information that changes the way the Service
              behaves or looks, such as the "remember me" functionality of a
              registered user or a user's language preference.
            </li>
            <li>
              <strong>Analytics cookies.</strong> We may use analytics cookies
              to track information how the Service is used so that we can make
              improvements. We may also use analytics cookies to test new
              advertisements, pages, features or new functionality of the
              Service to see how our users react to them.
            </li>
            <li>
              <strong>Advertising cookies.</strong> These type of cookies are
              used to deliver advertisements on and through the Service and
              track the performance of these advertisements. These cookies may
              also be used to enable third-party advertising networks to deliver
              ads that may be relevant to you based upon your activities or
              interests.
            </li>
          </ul>
          <h2>3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various
            third-parties cookies to report usage statistics of the Service,
            deliver advertisements on and through the Service, and so on.
          </p>
          <h2>4. What Are Your Choices Regarding Cookies</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to
            delete or refuse cookies, please visit the help pages of your web
            browser.
          </p>
          <p>
            Please note, however, that if you delete cookies or refuse to accept
            them, you might not be able to use all of the features we offer, you
            may not be able to store your preferences, and some of our pages
            might not display properly.
          </p>
          <ul>
            <li>
              For the Chrome web browser, please visit this page from Google:{' '}
              <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                https://support.google.com/accounts/answer/32050
              </a>
            </li>
            <li>
              For the Internet Explorer web browser, please visit this page from
              Microsoft:{' '}
              <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                http://support.microsoft.com/kb/278835
              </a>
            </li>
            <li>
              For the Firefox web browser, please visit this page from Mozilla:{' '}
              <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
              </a>
            </li>
            <li>
              For the Safari web browser, please visit this page from Apple:{' '}
              <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
              </a>
            </li>
          </ul>
          <p>
            For any other web browser, please visit your web browser's official
            web pages.
          </p>
          <h2>5. More Information About Cookies</h2>
          <p>
            You can learn more about cookies at the following third-party
            websites:
          </p>
          <ul>
            <li>
              Network Advertising Initiative:{' '}
              <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                http://www.networkadvertising.org/
              </a>
            </li>
            <li>
              All About Cookies:{' '}
              <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-[#016E4E] hover:underline">
                http://www.allaboutcookies.org/
              </a>
            </li>
          </ul>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about our Cookies Policy, please contact
            us.
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-10 mb-4" />
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
export default CookiesPolicy;