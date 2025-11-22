import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
const TermsOfService: React.FC = () => {
  return <div className="bg-white min-h-screen">
      <Navigation />
      <div className="bg-[#859CB6] bg-opacity-10 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#434C54] text-center">
            Terms of Service
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
            Welcome to Sprout'n ("Company", "we", "our", "us"). These Terms of
            Service ("Terms", "Terms of Service") govern your use of our website
            located at [website URL] (the "Service") operated by Sprout'n.
          </p>
          <p>
            Our Privacy Policy also governs your use of our Service and explains
            how we collect, safeguard and disclose information that results from
            your use of our web pages. Please read it here:{' '}
            <Link to="/privacy" className="text-[#016E4E] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </p>
          <h2>2. Communications</h2>
          <p>
            By creating an Account on our Service, you agree to subscribe to
            newsletters, marketing or promotional materials and other
            information we may send. However, you may opt out of receiving any,
            or all, of these communications from us by following the unsubscribe
            link or instructions provided in any email we send.
          </p>
          <h2>3. Purchases</h2>
          <p>
            If you wish to purchase any product or service made available
            through the Service ("Purchase"), you may be asked to supply certain
            information relevant to your Purchase including, without limitation,
            your credit card number, the expiration date of your credit card,
            your billing address, and your shipping information.
          </p>
          <p>
            You represent and warrant that: (i) you have the legal right to use
            any credit card(s) or other payment method(s) in connection with any
            Purchase; and that (ii) the information you supply to us is true,
            correct and complete.
          </p>
          <p>
            The service may employ the use of third-party services for the
            purpose of facilitating payment and the completion of Purchases. By
            submitting your information, you grant us the right to provide the
            information to these third parties subject to our Privacy Policy.
          </p>
          <p>
            We reserve the right to refuse or cancel your order at any time for
            reasons including but not limited to: product or service
            availability, errors in the description or price of the product or
            service, error in your order or other reasons.
          </p>
          <h2>4. Service Fees and Billing</h2>
          <p>
            You will pay all fees or charges to your account in accordance with
            the fees, charges, and billing terms in effect at the time a fee or
            charge is due and payable. Where Services are offered on a free
            trial basis, payment may be required after the free trial period
            ends, and not when you enter your billing details (which may be
            required prior to the commencement of the free trial period).
          </p>
          <p>
            If auto-renewal is enabled for the Services you have subscribed for,
            you will be charged automatically in accordance with the term you
            selected. If you have any questions about our billing practices or
            fees charged to your account, please contact us at [contact email].
          </p>
          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by
            users), features and functionality are and will remain the exclusive
            property of Sprout'n and its licensors. The Service is protected by
            copyright, trademark, and other laws of both the United States and
            foreign countries. Our trademarks and trade dress may not be used in
            connection with any product or service without the prior written
            consent of Sprout'n.
          </p>
          <h2>6. Content Policy</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material ("Content"). You are responsible for the Content that you
            post on or through the Service, including its legality, reliability,
            and appropriateness.
          </p>
          <p>
            By posting Content on or through the Service, You represent and
            warrant that: (i) the Content is yours (you own it) and/or you have
            the right to use it and the right to grant us the rights and license
            as provided in these Terms, and (ii) that the posting of your
            Content on or through the Service does not violate the privacy
            rights, publicity rights, copyrights, contract rights or any other
            rights of any person or entity.
          </p>
          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Sprout'n, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the Service; (ii) any conduct or content
            of any third party on the Service; (iii) any content obtained from
            the Service; and (iv) unauthorized access, use or alteration of your
            transmissions or content, whether based on warranty, contract, tort
            (including negligence) or any other legal theory, whether or not we
            have been informed of the possibility of such damage.
          </p>
          <h2>8. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is
            provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement
            or course of performance.
          </p>
          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </p>
          <h2>10. Changes to Terms of Service</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will provide
            at least 30 days notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            the Service.
          </p>
          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
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
export default TermsOfService;