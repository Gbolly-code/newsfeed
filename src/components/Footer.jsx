import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <div className="text-gray-600 text-sm">
            © 2024 News Today. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

