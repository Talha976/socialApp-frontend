import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTiktok , faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h5 className="text-white text-lg font-semibold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok } />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-white text-lg font-semibold mb-2">Contact Us</h5>
            <ul>
              <li>Email: <a href="" className="hover:text-white">talhashahzad834@gmail.com</a></li>
              <li>Phone: <a href="+92 3467560939" className="hover:text-white">+92 3467560939</a></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="text-white text-lg font-semibold mb-2">Location</h5>
            <p>Fort Abbas, Bahawalnagar, Punjab</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-6">
          <p className="text-center text-gray-500 text-sm">&copy; 2024 LinkedIn-like App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
