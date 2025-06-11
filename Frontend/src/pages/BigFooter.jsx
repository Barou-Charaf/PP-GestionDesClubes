import logoSrc from "../assets/ensetLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-left pt-10">
      {/* Upper section */}
      <div className="container mx-20 py-12">
        <div className="flex flex-col md:flex-row md:items-start">
          
          {/* Logo & description */}
          <div className="md:w-1/3 mb-8 mr-10 md:mb-0">
            <img src={logoSrc} alt="Logo" className="h-30 mb-4 mx-auto pr-20 -mt-5 " />
            <p className="text-[.6rem] leading-relaxed">
              École Nationale Supérieure de l'Enseignement Technique de Mohammedia (ENSET Mohammedia), founded in 1985, is a public higher-education and teacher-training institute affiliated with Hassan II University of Casablanca in Mohammedia, Morocco.
            </p>
          </div>

          {/* Links & contact */}
          <div className="md:w-2/3 flex flex-col sm:flex-row justify-between gap-8">
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline ">Legal Information</a></li>
                <li><a href="#" className="hover:underline ">Contact Us</a></li>
                <li><a href="#" className="hover:underline ">Blogs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Help Center</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:underline ">Find a Property</a></li>
                <li><a href="#" className="hover:underline ">How To Host?</a></li>
                <li><a href="#" className="hover:underline ">Why Us?</a></li>
                <li><a href="#" className="hover:underline ">FAQs</a></li>
                <li><a href="#" className="hover:underline ">Rental Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +212 523322220</li>
                <li>Web Site: <a href="https://www.enset-media.ac.ma">https://www.enset-media.ac.ma</a> </li>
                <li>Location: ENSET-Mohamedia</li>
              </ul>
              <div className="flex space-x-4 mt-4">
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between text-xs">
          <span>© 2025 ENSET Mohammedia | All rights reserved</span>
          <span className="mt-2 md:mt-0">Created with passion  By Enset's Students</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
