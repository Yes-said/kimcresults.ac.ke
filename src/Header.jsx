import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import LOGO from './assets/LOGO.png';

export default function Header() {
  const { user } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className='flex flex-wrap justify-between items-center py-3 px-4 bg-white shadow-md'>
      {/* Logo and Brand Name */}
      <Link to="/" className="flex items-center">
        <img src={LOGO} alt="LOGO" className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-700">
          Kenya Institute Of Mass Communication
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-4 mt-3 sm:mt-0">
        {user && (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link
              to="/dashboard"
              className="text-gray-700 font-medium text-sm sm:text-base hover:text-blue-500 transition"
            >
              Dashboard
            </Link>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 py-2 w-48 z-10">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard/courses"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Courses
                </Link>
                <Link
                  to="/dashboard/results"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Results
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User Account Section */}
      <Link
        to={user ? "/account" : "/login"}
        className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-3 sm:px-4 hover:bg-gray-100 transition mt-3 sm:mt-0'
      >
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