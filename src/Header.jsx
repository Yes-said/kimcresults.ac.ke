import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import LOGO from './assets/LOGO.png';
import { useState } from "react";
import axios from "axios";

export default function Header() {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?query=${searchQuery}`);
      const results = response.data; // Adjusted to use response.data directly
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  
  return (
    <header className='flex flex-wrap justify-between items-center py-3 px-4 bg-white shadow-md'>
      {/* Logo and Brand Name */}
      <Link to="/" className="flex items-center">
        <img src={LOGO} alt="LOGO" className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-700">Kenya Institute Of Mass Communication</span>
      </Link>

      {/* Middle section with search */}
      <div className='flex items-center w-full sm:w-auto gap-2 sm:gap-4 py-2 px-4 bg-gray-100 rounded-full shadow-lg transition-all duration-300 ease-in-out mt-3 sm:mt-0 focus-within:bg-white border focus-within:border-blue-500'>
        <input
          type="text"
          placeholder="Search by Name,department or course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-gray-700 font-small text-sm sm:text-base outline-none bg-transparent w-full placeholder-gray-500 px-2"
        />
        <button
          onClick={handleSearch}
          className='p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-400'
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* User Account Section */}
      <Link to={user ? "/account" : "/login"} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-3 sm:px-4 hover:bg-gray-100 transition mt-3 sm:mt-0'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div className="text-gray-700 font-medium text-sm sm:text-base">{user.name}</div>
        )}
      </Link>
    </header>
  );
}
