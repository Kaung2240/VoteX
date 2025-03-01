import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaVoteYea,
  FaCalendarPlus,
  FaMoon,
  FaSun,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";

interface NavBarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const navigation = [
  { name: "Dashboard", path: "/", icon: FaHome },
  { name: "Events", path: "/events", icon: FaCalendarAlt },
  { name: "Add Event", path: "/add-event", icon: FaCalendarPlus },
];

export const NavBar = ({ 
  darkMode, 
  setDarkMode,
}: NavBarProps) => {
  // Track user authentication state (this would come from your auth context in a real app)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Handle logout
  const handleLogout = () => {
    // Here you would implement actual logout logic
    setIsAuthenticated(false);
    navigate("/");
  };
  
  return (
    <nav className="flex fixed top-0 left-0 h-screen z-50">
      <div className="relative flex flex-col w-16 hover:w-48 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 shadow-lg group">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 py-5 border-b px-2 border-gray-200 dark:border-gray-700">
          <FaVoteYea className="text-cyan-800 dark:text-cyan-400 text-5xl min-w-[3rem]" />
          <span className="text-black dark:text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            VoteX
          </span>
        </div>
        
        {/* Navigation Items */}
        <ul className="flex-1 overflow-y-auto pt-4">
          {navigation.map((item) => (
            <li
              key={item.path}
              className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  w-full flex items-center space-x-4 px-3 py-2 rounded-lg 
                  ${isActive 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <item.icon className="text-xl min-w-[1.5rem]" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Authentication Section */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <div className="p-2">
              <NavLink
                to="/profile"
                className={({ isActive }) => `
                  w-full flex items-center space-x-4 px-3 py-2 rounded-lg 
                  ${isActive 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <FaUser className={`text-xl min-w-[1.5rem] ${isActive ? 'text-white' : 'text-blue-500'}`} />
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate font-medium">
                      My Profile
                    </span>
                  </>
                )}
              </NavLink>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-4 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-1"
              >
                <FaSignOutAlt className="text-xl min-w-[1.5rem] text-red-500" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  Sign Out
                </span>
              </button>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              <NavLink
                to="/login"
                className={({ isActive }) => `
                  w-full flex items-center space-x-4 px-3 py-2 rounded-lg 
                  ${isActive 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <FaSignInAlt className="text-xl min-w-[1.5rem] text-green-500" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  Sign In
                </span>
              </NavLink>
              
              <NavLink
                to="/register"
                className={({ isActive }) => `
                  w-full flex items-center space-x-4 px-3 py-2 rounded-lg 
                  ${isActive 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <FaUserPlus className="text-xl min-w-[1.5rem] text-blue-500" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  Sign Up
                </span>
              </NavLink>
            </div>
          )}
        </div>
        
        {/* Dark Mode Toggle */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center space-x-4 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <FaSun className="text-xl min-w-[1.5rem] text-yellow-500" />
            ) : (
              <FaMoon className="text-xl min-w-[1.5rem] text-blue-400" />
            )}
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};