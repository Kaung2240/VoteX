import { useState } from "react";
import { FaPlus, FaTrash, FaUpload, FaCalendar, FaLock, FaUnlock, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

const CreateEvent = ({ darkMode }: { darkMode: boolean }) => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    start: "",
    end: "",
    category: "Technology",
    isPrivate: false,
  });
  const [candidates, setCandidates] = useState([{
    id: 1,
    name: "",
    bio: "",
    image: null as File | null,
    preview: "",
  }]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, {
      id: candidates.length + 1,
      name: "",
      bio: "",
      image: null,
      preview: "",
    }]);
  };

  const handleRemoveCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidates(candidates.map(candidate => 
          candidate.id === id ? { ...candidate, image: file, preview: reader.result as string } : candidate
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={`p-4 lg:p-8 min-h-screen ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Form Header */}
        <div className="mb-8">
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Create New Voting Event
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm lg:text-base`}>
            Set up your voting event in just a few steps
          </p>
        </div>

        {/* Event Details Card */}
        <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <FaCalendar className="inline-block mr-2 text-blue-500" />
            Event Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Event Name
              </label>
              <input
                type="text"
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-200"
                }`}
                value={eventDetails.name}
                onChange={(e) => setEventDetails({...eventDetails, name: e.target.value})}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Category
              </label>
              <select
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-200"
                }`}
                value={eventDetails.category}
                onChange={(e) => setEventDetails({...eventDetails, category: e.target.value})}
              >
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-200"
                }`}
                value={eventDetails.start}
                onChange={(e) => setEventDetails({...eventDetails, start: e.target.value})}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                End Date & Time
              </label>
              <input
                type="datetime-local"
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-200"
                }`}
                value={eventDetails.end}
                onChange={(e) => setEventDetails({...eventDetails, end: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`flex items-center space-x-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={eventDetails.isPrivate}
                  onChange={(e) => setEventDetails({...eventDetails, isPrivate: e.target.checked})}
                />
                <span className="text-sm">
                  {eventDetails.isPrivate ? <FaLock className="inline-block mr-1" /> : <FaUnlock className="inline-block mr-1" />}
                  Private Event (Requires invitation)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Candidates Section */}
        <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <FaUsers className="inline-block mr-2 text-blue-500" />
            Candidates
          </h2>

          <div className="space-y-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-50"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Candidate #{index + 1}
                  </h3>
                  {candidates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? "text-red-400 hover:bg-red-400" : "text-red-500 hover:bg-red-500"}`}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Upload */}
                  <div className="md:col-span-1">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Photo
                    </label>
                    <div className="relative aspect-square group">
                      <div className={`w-full h-full rounded-lg border-2 border-dashed flex items-center justify-center 
                        ${darkMode ? "border-gray-500 hover:border-gray-400" : "border-gray-300 hover:border-gray-400"}`}>
                        {candidate.preview ? (
                          <img src={candidate.preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="text-center">
                            <FaUpload className="w-8 h-8 mb-2 text-gray-400 mx-auto" />
                            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Click to upload
                            </span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(candidate.id, e)}
                      />
                    </div>
                  </div>

                  {/* Candidate Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                        }`}
                        value={candidate.name}
                        onChange={(e) => setCandidates(candidates.map(c => 
                          c.id === candidate.id ? {...c, name: e.target.value} : c
                        ))}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Bio/Description
                      </label>
                      <textarea
                        rows={3}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                        }`}
                        value={candidate.bio}
                        onChange={(e) => setCandidates(candidates.map(c => 
                          c.id === candidate.id ? {...c, bio: e.target.value} : c
                        ))}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCandidate}
            className={`mt-6 px-4 py-2 rounded-lg flex items-center gap-2 ${
              darkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            <FaPlus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg ${
              darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2`}
          >
            Create Event
            <FaPlus className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};




export default CreateEvent;

