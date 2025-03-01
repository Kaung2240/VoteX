// components/UserProfile.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaCamera, 
  FaKey, 
  FaHistory,
  FaSave,
  FaVoteYea,
  FaCheckCircle,
  FaClock,
  FaGlobeAmericas
} from "react-icons/fa";
import api from "../utils/api";

interface UserProfileProps {
  darkMode: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Product designer and tech enthusiast. I enjoy participating in community voting events and organizing local initiatives.",
    joinDate: "January 2023",
    profileImage: "https://i.pravatar.cc/150?img=11"
  });
  
  // Mock voting history data
  const votingHistory = [
    { id: 1, title: "Community Park Renovation", date: "2023-11-15", status: "Completed" },
    { id: 2, title: "Annual Budget Allocation", date: "2023-10-22", status: "Completed" },
    { id: 3, title: "Local Business Development", date: "2023-09-05", status: "Completed" },
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    { id: 101, title: "School Board Elections", date: "2023-12-12", timeRemaining: "2 days" },
    { id: 102, title: "Neighborhood Improvement", date: "2023-12-18", timeRemaining: "8 days" },
  ];
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would implement actual profile update logic
  };

  // Update timezone list since Intl.supportedValuesOf is not widely supported
  const timeZoneList = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];

  // Handle timezone change
  const handleTimezoneChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const response = await api.updateTimezone(e.target.value);
      if (response.status === 200) {
        setTimezone(e.target.value);
        // Add success notification if you have one
      }
    } catch (error) {
      console.error('Failed to update timezone:', error);
      // Add error notification if you have one
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className={`h-48 ${darkMode ? "bg-blue-900" : "bg-blue-50"} relative`}>
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`pt-12 text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            My Profile
          </motion.h1>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="col-span-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-700" : "bg-white"}`}
            >
              {/* Profile Header */}
              <div className="relative">
                <div className={`h-32 ${darkMode ? "bg-blue-800" : "bg-blue-100"}`}>
                  <button 
                    className="absolute top-2 right-2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50"
                    aria-label="Change cover photo"
                  >
                    <FaCamera />
                  </button>
                </div>
                <div className="flex justify-center">
                  <div className="absolute -bottom-16">
                    <div className="relative">
                      <img 
                        src={userData.profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700"
                      />
                      <button 
                        className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
                        aria-label="Change profile photo"
                      >
                        <FaCamera size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <FaMapMarkerAlt className="inline mr-2" />
                  {userData.location}
                </p>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      darkMode 
                        ? "bg-blue-500 hover:bg-blue-600" 
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    <FaEdit className="mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </button>
                </div>
              </div>
              
              {/* User Stats */}
              <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{votingHistory.length}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <FaVoteYea className="inline mr-1" />
                      Votes Cast
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <FaCalendarAlt className="inline mr-1" />
                      Upcoming
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-6 rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-700" : "bg-white"}`}
            >
              <div className={`px-6 py-4 ${darkMode ? "bg-gray-600" : "bg-gray-50"} border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <h3 className="font-bold">Contact Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className={`mt-1 mr-3 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</p>
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUser className={`mt-1 mr-3 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Phone</p>
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCalendarAlt className={`mt-1 mr-3 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Joined</p>
                    <p>{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Tabs & Content */}
          <div className="col-span-1 lg:col-span-2">
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-700" : "bg-white"} z-10 relative`}>
              {/* Tabs */}
              <div className={`flex border-b ${darkMode ? "border-gray-600" : "border-gray-200"} w-full`}>
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`px-6 py-4 text-center flex-1 font-medium ${
                    activeTab === "profile" 
                      ? darkMode 
                        ? "border-b-2 border-blue-400 text-blue-400" 
                        : "border-b-2 border-blue-600 text-blue-600"
                      : ""
                  }`}
                >
                  <FaUser className="inline mr-2" />
                  Profile
                </button>
                <button 
                  onClick={() => setActiveTab("history")}
                  className={`px-6 py-4 text-center flex-1 font-medium ${
                    activeTab === "history" 
                      ? darkMode 
                        ? "border-b-2 border-blue-400 text-blue-400" 
                        : "border-b-2 border-blue-600 text-blue-600"
                      : ""
                  }`}
                >
                  <FaHistory className="inline mr-2" />
                  Vote History
                </button>
                <button 
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-6 py-4 text-center flex-1 font-medium ${
                    activeTab === "upcoming" 
                      ? darkMode 
                        ? "border-b-2 border-blue-400 text-blue-400" 
                        : "border-b-2 border-blue-600 text-blue-600"
                      : ""
                  }`}
                >
                  <FaCalendarAlt className="inline mr-2" />
                  Upcoming
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`px-6 py-4 text-center flex-1 font-medium ${
                    activeTab === "settings" 
                      ? darkMode 
                        ? "border-b-2 border-blue-400 text-blue-400" 
                        : "border-b-2 border-blue-600 text-blue-600"
                      : ""
                  }`}
                >
                  <FaKey className="inline mr-2" />
                  Settings
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    {isEditing ? (
                      <form onSubmit={handleProfileUpdate}>
                        <div className="space-y-4">
                          <div>
                            <label 
                              className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <input 
                              type="text"
                              id="name"
                              value={userData.name}
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              className={`w-full px-3 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-gray-600 border-gray-500 text-white" 
                                  : "bg-white border-gray-300 text-gray-900"
                              } border focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <label 
                              className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input 
                              type="email"
                              id="email"
                              value={userData.email}
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                              className={`w-full px-3 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-gray-600 border-gray-500 text-white" 
                                  : "bg-white border-gray-300 text-gray-900"
                              } border focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <label 
                              className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              htmlFor="phone"
                            >
                              Phone
                            </label>
                            <input 
                              type="tel"
                              id="phone"
                              value={userData.phone}
                              onChange={(e) => setUserData({...userData, phone: e.target.value})}
                              className={`w-full px-3 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-gray-600 border-gray-500 text-white" 
                                  : "bg-white border-gray-300 text-gray-900"
                              } border focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <label 
                              className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              htmlFor="location"
                            >
                              Location
                            </label>
                            <input 
                              type="text"
                              id="location"
                              value={userData.location}
                              onChange={(e) => setUserData({...userData, location: e.target.value})}
                              className={`w-full px-3 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-gray-600 border-gray-500 text-white" 
                                  : "bg-white border-gray-300 text-gray-900"
                              } border focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <label 
                              className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              htmlFor="bio"
                            >
                              Bio
                            </label>
                            <textarea 
                              id="bio"
                              value={userData.bio}
                              onChange={(e) => setUserData({...userData, bio: e.target.value})}
                              rows={4}
                              className={`w-full px-3 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-gray-600 border-gray-500 text-white" 
                                  : "bg-white border-gray-300 text-gray-900"
                              } border focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div className="flex justify-end">
                            <button 
                              type="submit"
                              className={`flex items-center px-4 py-2 rounded-lg ${
                                darkMode 
                                  ? "bg-blue-500 hover:bg-blue-600" 
                                  : "bg-blue-600 hover:bg-blue-700"
                              } text-white`}
                            >
                              <FaSave className="mr-2" />
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            About Me
                          </h3>
                          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {userData.bio}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Voting Preferences
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                              <p className="font-medium">Notification Preferences</p>
                              <div className="mt-2 flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="emailNotifications" 
                                  className="mr-2"
                                  checked 
                                />
                                <label htmlFor="emailNotifications">Email Notifications</label>
                              </div>
                              <div className="mt-2 flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="reminderAlerts" 
                                  className="mr-2"
                                  checked 
                                />
                                <label htmlFor="reminderAlerts">Vote Reminders</label>
                              </div>
                            </div>
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                              <p className="font-medium">Privacy Settings</p>
                              <div className="mt-2 flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="publicProfile" 
                                  className="mr-2" 
                                />
                                <label htmlFor="publicProfile">Make my votes public</label>
                              </div>
                              <div className="mt-2 flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="shareData" 
                                  className="mr-2" 
                                />
                                <label htmlFor="shareData">Share anonymous voting data</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Vote History Tab */}
                {activeTab === "history" && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Your Voting History
                    </h3>
                    <div className="overflow-hidden rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className={`${darkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Event
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`${darkMode ? "bg-gray-700" : "bg-white"} divide-y divide-gray-200 dark:divide-gray-600`}>
                          {votingHistory.map((event) => (
                            <tr key={event.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FaVoteYea className={`mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                                  <div>{event.title}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {event.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"
                                }`}>
                                  <FaCheckCircle className="mr-1 mt-0.5" />
                                  {event.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Upcoming Events Tab */}
                {activeTab === "upcoming" && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Upcoming Votes
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div 
                          key={event.id}
                          className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-600" : "bg-gray-50"} flex justify-between items-center`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <FaCalendarAlt className={`mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                              <h4 className="font-medium">{event.title}</h4>
                            </div>
                            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {event.date}
                            </p>
                          </div>
                          <div>
                            <span className={`flex items-center text-sm font-medium ${
                              darkMode ? "text-orange-400" : "text-orange-500"
                            }`}>
                              <FaClock className="mr-1" />
                              {event.timeRemaining} left
                            </span>
                            <button 
                              className={`mt-2 flex items-center px-3 py-1 rounded-lg text-sm ${
                                darkMode 
                                  ? "bg-blue-500 hover:bg-blue-600" 
                                  : "bg-blue-600 hover:bg-blue-700"
                              } text-white`}
                            >
                              <FaVoteYea className="mr-1" />
                              Vote Now
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {upcomingEvents.length === 0 && (
                        <div className={`p-6 text-center rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                          <p>No upcoming votes at this time.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Account Settings
                      </h3>
                      <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"} space-y-4`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Change Password</p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Last changed 3 months ago
                            </p>
                          </div>
                          <button 
                            className={`px-4 py-2 rounded-lg ${
                              darkMode 
                                ? "bg-gray-500 hover:bg-gray-400" 
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            <FaKey className="mr-1 inline" />
                            Update
                          </button>
                        </div>

                        <div className="pt-4 border-t border-gray-500">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Timezone</p>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Used as default for all events
                              </p>
                            </div>
                            <div className="w-48">
                              <div className="relative">
                                <div className="absolute left-3 top-3">
                                  <FaGlobeAmericas className="text-gray-400" />
                                </div>
                                <select
                                  id="timezone"
                                  value={timezone}
                                  onChange={handleTimezoneChange}
                                  className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                                    darkMode 
                                      ? "bg-gray-700 border-gray-600 text-white" 
                                      : "bg-gray-100 border-gray-300 text-gray-900"
                                  } border focus:ring-2 focus:ring-blue-500`}
                                >
                                  {timeZoneList.map((tz) => (
                                    <option key={tz} value={tz}>
                                      {tz.replace(/_/g, ' ')}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"} flex items-center justify-between`}>
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Receive emails about new votes and results
                            </p>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id="emailToggle" 
                              name="emailToggle"
                              className="sr-only"
                              defaultChecked
                            />
                            <label 
                              htmlFor="emailToggle" 
                              className={`block h-6 rounded-full cursor-pointer ${darkMode ? "bg-blue-500" : "bg-blue-600"}`}
                            >
                              <span className="block h-6 w-6 rounded-full bg-white transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"} flex items-center justify-between`}>
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Receive alerts on your device
                            </p>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id="pushToggle" 
                              name="pushToggle"
                              className="sr-only"
                              defaultChecked
                            />
                            <label 
                              htmlFor="pushToggle" 
                              className={`block h-6 rounded-full cursor-pointer ${darkMode ? "bg-blue-500" : "bg-blue-600"}`}
                            >
                              <span className="block h-6 w-6 rounded-full bg-white transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Privacy
                      </h3>
                      <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                        <div className="mb-4">
                          <label className="font-medium">Who can see my voting activity</label>
                          <select 
                            className={`mt-1 block w-full px-3 py-2 rounded-lg ${
                              darkMode 
                                ? "bg-gray-700 border-gray-600 text-white" 
                                : "bg-white border-gray-300 text-gray-900"
                            } border focus:ring-2 focus:ring-blue-500`}
                          >
                            <option>Only me</option>
                            <option>Friends only</option>
                            <option>Everyone</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="anonymousStats" 
                            className="mr-2" 
                            defaultChecked
                          />
                          <label htmlFor="anonymousStats">
                            Contribute anonymous voting statistics
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;