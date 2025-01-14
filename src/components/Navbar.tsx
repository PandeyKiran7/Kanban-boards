import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon'; 

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-green-500 text-white p-4 shadow-md w-full sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="logo text-2xl font-semibold">
          <Link to="/" className="hover:text-yellow-400 transition-all">
            MyStore
          </Link>
        </div>

        <div className="flex flex-col relative w-1/3">
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <SearchIcon /> 
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Products..."
            className="w-full pl-12 pr-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <ul className="nav-links flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-yellow-400 transition-all">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-yellow-400 transition-all">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-400 transition-all">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition-all">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;