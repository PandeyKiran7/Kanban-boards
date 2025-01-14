import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-500 text-white py-6 mt-8 w-full">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="text-sm">
          &copy; 2025 MyStore. All rights reserved.
        </p>

        {/* Social Links */}
        <ul className="social-links flex justify-center space-x-6 mt-4">
          <li>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-yellow-400 transition-all"
            >
              Facebook
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-yellow-400 transition-all"
            >
              Twitter
            </a>
          </li>
          <li>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-yellow-400 transition-all"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;