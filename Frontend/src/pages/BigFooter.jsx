import logoSrc from "../assets/ensetLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

/**
 * Footer component
 * @param {string} logoSrc - source URL for the logo image
 */
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Upper section */}
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between">
        {/* Logo & description */}
        <div className="mb-8 md:mb-0 md:w-1/4">
           <img src={logoSrc} alt="Logo" className="h-12 mb-4" />          
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Company links */}
        <div className="mb-8 md:mb-0 md:w-1/6">
          <h4 className="font-semibold mb-4">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Legal Information</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Blogs</a></li>
          </ul>
        </div>

        {/* Help Center links */}
        <div className="mb-8 md:mb-0 md:w-1/6">
          <h4 className="font-semibold mb-4">HELP CENTER</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Find a Property</a></li>
            <li><a href="#" className="hover:underline">How To Host?</a></li>
            <li><a href="#" className="hover:underline">Why Us?</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Rental Guides</a></li>
          </ul>
        </div>

        {/* Contact Info & Social */}
        <div className="md:w-1/4">
          <h4 className="font-semibold mb-4">CONTACT INFO</h4>
          <div className="space-y-2 text-sm mb-4">
            <p>Phone: +2126270-56896</p>
            <p>Email: W7@email.com</p>
            <p>Location: ENSET-Mohamedia</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between text-xs text-gray-600">
          <span>© 2025 LUCIFERXIII.design | All rights reserved</span>
          <span className="mt-2 md:mt-0">Created with hell by LUCIFERXIII.design</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
