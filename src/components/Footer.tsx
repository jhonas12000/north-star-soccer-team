import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-300 text-blue py-6">
        <div className="container mx-auto text-center">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li>
              <a href="mailto:contact@example.com" className="hover:underline">
                Email: contact@example.com
              </a>
            </li>
            <li>
              <a href="tel:+123456789" className="hover:underline">
                Tel: +1 234 567 89
              </a>
            </li>
            <li className="flex justify-center space-x-4 mt-4">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  };
  
  export default Footer;