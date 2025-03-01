import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

interface EventInfoProps {
  event: {
    title: string;
    description: string;
    category: string;
    status: string;
    start: string;
    end: string;
    creator: string;
    participants: number;
    location: string;
  };
  calculateProgress: (start: string, end: string) => number;
  formatEventDate: (dateStr: string) => string;
  darkMode: boolean;
}

const EventInfo: React.FC<EventInfoProps> = ({
  event,
  calculateProgress,
  formatEventDate,
  darkMode,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-green-500";
      case "upcoming": return "bg-blue-500";
      case "ended": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
    >
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>About This Event</h2>
      <p className={`mb-6 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {event.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
            <FaCalendar className="text-blue-500" size={18} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Date & Time</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {formatEventDate(event.start)}
            </p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              to {formatEventDate(event.end)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-green-50"}`}>
            <FaMapMarkerAlt className="text-green-500" size={18} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Location</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {event.location}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}>
            <FaUser className="text-purple-500" size={18} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Organizer</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {event.creator}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-orange-50"}`}>
            <FaUsers className="text-orange-500" size={18} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Participants</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {event.participants.toLocaleString()} attendees
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventInfo;