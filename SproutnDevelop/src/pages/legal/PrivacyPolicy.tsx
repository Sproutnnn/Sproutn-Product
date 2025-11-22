import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
const PrivacyPolicy: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      <div className="bg-[#859CB6] bg-opacity-10 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#434C54] text-center">
            Privacy Policy
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
          <h2>1. Introduction</h2>
          <p>
            Sprout'n ("we", "our", "us") respects the privacy of our users
            ("user", "you"). This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            and use our services. Please read this privacy policy carefully. If
            you do not agree with the terms of this privacy policy, please do
            not access the site.
          </p>
          <p>
            We reserve the right to make changes to this Privacy Policy at any
            time and for any reason. We will alert you about any changes by
            updating the "Last updated" date of this Privacy Policy. You are
            encouraged to periodically review this Privacy Policy to stay
            informed of updates.
          </p>
          <h2>2. Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect via the Site includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping
            address, email address, and telephone number, and demographic
            information, such as your age, gender, hometown, and interests, that
            you voluntarily give to us when you register with the Site or when
            you choose to participate in various activities related to the Site,
            such as online chat and message boards. You are under no obligation
            to provide us with personal information of any kind, however your
            refusal to do so may prevent you from using certain features of the
            Site.
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the
            Site, such as your IP address, your browser type, your operating
            system, your access times, and the pages you have viewed directly
            before and after accessing the Site.
          </p>
          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method
            (e.g. valid credit card number, card brand, expiration date) that we
            may collect when you purchase, order, return, exchange, or request
            information about our services from the Site. We store only very
            limited, if any, financial information that we collect. Otherwise,
            all financial information is stored by our payment processor and you
            are encouraged to review their privacy policy and contact them
            directly for responses to your questions.
          </p>
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your orders and manage your transactions.</li>
            <li>Email you regarding your account or order.</li>
            <li>
              Fulfill and manage purchases, orders, payments, and other
              transactions related to the Site.
            </li>
            <li>
              Send you product, service and new feature information and/or
              information about changes to our terms, conditions, and policies.
            </li>
            <li>
              Prevent fraudulent transactions, monitor against theft, and
              protect against criminal activity.
            </li>
            <li>
              Request feedback and contact you about your use of the Site.
            </li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
            <li>
              Develop new products, services, features, and functionality.
            </li>
          </ul>
          <h2>4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to
            respond to legal process, to investigate or remedy potential
            violations of our policies, or to protect the rights, property, and
            safety of others, we may share your information as permitted or
            required by any applicable law, rule, or regulation.
          </p>
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform
            services for us or on our behalf, including payment processing, data
            analysis, email delivery, hosting services, customer service, and
            marketing assistance.
          </p>
          <h3>Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw
            consent, we may share your information with third parties for
            marketing purposes.
          </p>
          <h3>Interactions with Other Users</h3>
          <p>
            If you interact with other users of the Site, those users may see
            your name, profile photo, and descriptions of your activity.
          </p>
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
          <h2>6. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children
            under the age of 13. If you become aware of any data we have
            collected from children under age 13, please contact us using the
            contact information provided below.
          </p>
          <h2>7. Controls for Do-Not-Track Features</h2>
          <p>
            Most web browsers and some mobile operating systems include a
            Do-Not-Track ("DNT") feature or setting you can activate to signal
            your privacy preference not to have data about your online browsing
            activities monitored and collected. No uniform technology standard
            for recognizing and implementing DNT signals has been finalized. As
            such, we do not currently respond to DNT browser signals or any
            other mechanism that automatically communicates your choice not to
            be tracked online.
          </p>
          <h2>8. Options Regarding Your Information</h2>
          <h3>Account Information</h3>
          <p>
            You may at any time review or change the information in your account
            or terminate your account by:
          </p>
          <ul>
            <li>
              Logging into your account settings and updating your account
            </li>
            <li>Contacting us using the contact information provided below</li>
          </ul>
          <p>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, some information may be retained in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with legal requirements.
          </p>
          <h2>9. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us.
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
export default PrivacyPolicy;