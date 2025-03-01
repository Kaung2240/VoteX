import {
  FaSearch,
  FaCalendar,
  FaUser,
  FaUsers,
  FaMusic,
  FaFutbol,
  FaTheaterMasks,
  FaRegClock,
  FaCalendarPlus,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaFilter,
  FaStar,
  FaEye
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export interface Event {
  id: number;
  title: string;
  category: string;
  status: "ongoing" | "upcoming" | "ended";
  start: string;
  end: string;
  creator: string;
  participants: number;
}

interface EventComponentProps {
  darkMode: boolean;
}

export const EventComponent = ({ darkMode }: EventComponentProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Tech Conference 2024",
      category: "Technology",
      status: "ongoing",
      start: "2024-03-15 09:00",
      end: "2024-03-17 18:00",
      creator: "Tech Org",
      participants: 1200,
    },
    // Keep your existing events array
  ]); 

  // Simulate loading state for better UX feedback
  useEffect(() => {
    const simulateLoading = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };
    simulateLoading();
  }, [searchQuery, selectedCategory, sortBy, currentPage]);

  // Mock pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Enhanced category icons with better visual representation
  const categoryIcons = {
    Technology: <FaTheaterMasks className="w-6 h-6 text-purple-500" />,
    Music: <FaMusic className="w-6 h-6 text-blue-500" />,
    Sports: <FaFutbol className="w-6 h-6 text-green-500" />,
  };

  // Get category color for consistent styling
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Technology": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Music": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Sports": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const calculateProgress = (start: string, end: string) => {
    const now = Date.now();
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const progress = ((now - startTime) / (endTime - startTime)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  // Format date for better readability
  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // New hover state for cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleViewDetails = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    navigate(`/event/${eventId}`);
  };

  return (
    <div className={`flex-1 h-screen px-3 py-6 md:px-5 md:py-8 lg:px-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Header Section - Improved with better spacing and responsive design */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Events Dashboard
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm lg:text-base`}>
            Showing <span className="font-medium">{paginatedEvents.length}</span> of <span className="font-medium">{events.length}</span> events
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`md:hidden p-2.5 rounded-lg ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
            } shadow-sm`}
            aria-label="Toggle filters"
          >
            <FaFilter className={`${showFilters ? "text-blue-500" : darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" 
                ? "bg-blue-500 text-white shadow-md" 
                : `${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"} shadow-sm`}`}
              aria-label="Grid view"
            >
              <FaTh />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "list" 
                ? "bg-blue-500 text-white shadow-md" 
                : `${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"} shadow-sm`}`}
              aria-label="List view"
            >
              <FaList />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-md ${
              darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors duration-200`}
            onClick={() => navigate('/add-event')}
          >
            <FaCalendarPlus className="text-lg" />
            <span className="hidden md:block font-medium">New Event</span>
          </motion.button>
        </div>
      </div>
  
      {/* Filters Section - Enhanced with animation and better mobile experience */}
      <AnimatePresence>
        {(showFilters || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8 overflow-hidden"
          >
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500" 
                    : "bg-white border-gray-200 focus:border-blue-400"
                } outline-none transition-all duration-200`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
              />
            </div>
      
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1); // Reset to first page on category change
              }}
              className={`px-4 py-2.5 rounded-lg border cursor-pointer ${
                darkMode 
                  ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500" 
                  : "bg-white border-gray-200 focus:border-blue-400"
              } outline-none transition-all duration-200`}
            >
              <option value="all">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
            </select>
      
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSortBy("latest");
                  setCurrentPage(1);
                }}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm ${
                  sortBy === "latest" 
                    ? "bg-blue-500 text-white shadow-md" 
                    : darkMode 
                      ? "bg-gray-800 text-white hover:bg-gray-700" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-all duration-200`}
              >
                <FaRegClock />
                <span>Latest</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSortBy("popular");
                  setCurrentPage(1);
                }}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm ${
                  sortBy === "popular" 
                    ? "bg-blue-500 text-white shadow-md" 
                    : darkMode 
                      ? "bg-gray-800 text-white hover:bg-gray-700" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-all duration-200`}
              >
                <FaUsers />
                <span>Popular</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  
      {/* Content Section with Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : paginatedEvents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4 text-gray-400 dark:text-gray-600">
            <FaCalendarAlt className="mx-auto" />
          </div>
          <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            No events found
          </h3>
          <p className={`text-gray-500 dark:text-gray-400 max-w-md mx-auto`}>
            We couldn't find any events matching your criteria. Try adjusting your filters or create a new event.
          </p>
          <button 
            className={`mt-6 px-6 py-3 rounded-lg ${
              darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
            } text-white flex items-center gap-2 mx-auto`}
            onClick={() => navigate('/add-event')}
          >
            <FaCalendarPlus />
            <span>Create New Event</span>
          </button>
        </motion.div>
      ) : (
        <>
          <div className={`grid gap-5 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}>
            {paginatedEvents.map((event) => (
              <Link 
                key={event.id}
                to={`/event/${event.id}`}
                className="no-underline"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: darkMode 
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" 
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                  } shadow-lg relative cursor-pointer`}
                  onMouseEnter={() => setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Status Ribbon - Enhanced with better styling */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === "ongoing" ? "bg-green-500" :
                    event.status === "upcoming" ? "bg-blue-500" : "bg-red-500"
                  } text-white shadow-sm z-10`}>
                    {event.status}
                  </div>
                  {/* Card Header with Color Accent */}
                  <div className={`h-2 w-full ${
                    event.category === "Technology" ? "bg-purple-500" :
                    event.category === "Music" ? "bg-blue-500" :
                    event.category === "Sports" ? "bg-green-500" : "bg-gray-500"
                  }`}></div>
    
                  <div className={`p-5 mt-5 ${viewMode === "list" ? "flex flex-col md:flex-row md:items-center md:gap-6" : ""}`}>
                    {/* Improved Progress Bar for ongoing events */}
                    {event.status === "ongoing" && (
                      <div className="mb-4 mt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Event Progress
                          </span>
                          <span className="text-xs font-semibold text-blue-500">
                            {Math.round(calculateProgress(event.start, event.end))}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress(event.start, event.end)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-500 rounded-full" 
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Card Content with Improved Layout */}
                    <div className={`flex flex-col gap-4 ${viewMode === "list" ? "md:flex-1" : ""}`}>
                      <div className={`flex ${viewMode === "list" ? "gap-4 md:gap-6" : "flex-col gap-4"}`}>
                        {/* Category Badge with Icon */}
                        <div className={`flex items-center ${viewMode === "list" ? "" : ""}`}>
                          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"} ${viewMode === "list" ? "hidden md:block" : ""}`}>
                            {categoryIcons[event.category as keyof typeof categoryIcons]}
                          </div>
                          
                          <div className={`${viewMode === "list" ? "md:hidden" : "hidden"} mt-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </div>
                        </div>
                        
                        <div className={`flex-1 ${viewMode === "list" ? "" : ""}`}>
                          {/* Category Label for Grid View */}
                          <div className={`${viewMode === "list" ? "hidden md:inline-block" : "block"} mb-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </div>
                          
                          {/* Event Title - Enhanced with hover effect */}
                          <h3 className={`text-lg font-semibold group relative ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {event.title}
                            {hoveredCard === event.id && (
                              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
                            )}
                          </h3>
        
                          {/* Date & Time Information with better formatting */}
                          <div className="space-y-3 mt-3">
                            <div className="flex items-center gap-2.5">
                              <FaCalendar className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                              <div>
                                <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  {new Date(event.start).toLocaleDateString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                  })}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {' '}
                                  {new Date(event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            </div>
        
                            {/* Creator and Participants Information */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <FaUser className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  {event.creator}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaUsers className={`w-3.5 h-3.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <span className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                  {event.participants.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
  
          {/* Enhanced Pagination with Better UX */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-1 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 ${
                    currentPage === 1 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  } ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"} transition-colors`}
                >
                  &laquo;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 font-medium transition-all duration-200 ${
                      page === currentPage 
                        ? "bg-blue-500 text-white" 
                        : darkMode 
                          ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
                          : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 ${
                    currentPage === totalPages 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  } ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"} transition-colors`}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}