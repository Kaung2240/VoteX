import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaHeart,
  FaShare,
} from "react-icons/fa";

// Import modularized components
import EventInfo from "./event-detail/EventInfo";
import CandidateVoting from "./voting/CandidateVoting";
import VotingSummary from "./voting/VotingSummary";
import VoteConfirmationModal from "./voting/VoteConfirmationModal";
// import VoteResultDetails from "./voting/VoteResultDetails";
import { VoteResultComponent } from "./VoteResult";

interface Candidate {
  id: number;
  name: string;
  description: string;
  votes: number;
  image?: string;
}

interface EventDetailProps {
  darkMode: boolean;
  eventId: number;
  setCurrentPage: (page: string) => void;
}

export const EventDetail = ({ darkMode, eventId, setCurrentPage }: EventDetailProps) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingInProgress, setVotingInProgress] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showVoteResults, setShowVoteResults] = useState(false);

  // Mock event data - in a real app, fetch this from API
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockEvent = {
        id: eventId,
        title: "Tech Conference 2024",
        description: "Join us for the biggest tech conference of 2024. Featuring keynotes from industry leaders, workshops, and networking opportunities.",
        category: "Technology",
        status: "ongoing",
        start: "2024-03-15 09:00",
        end: "2024-03-17 18:00",
        creator: "Tech Org",
        participants: 1200,
        location: "San Francisco Convention Center",
        candidates: [
          {
            id: 1,
            name: "Next.js Workshop",
            description: "Learn the latest features of Next.js 14 and build a full-stack application.",
            votes: 485,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: 2,
            name: "AI & Machine Learning Panel",
            description: "Industry experts discuss the future of AI and its impact on technology.",
            votes: 367,
            image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: 3,
            name: "Cloud Computing Keynote",
            description: "Explore the latest trends in cloud architecture and serverless computing.",
            votes: 298,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
        ],
        totalVotes: 1150,
      };
      setEvent(mockEvent);
      setLoading(false);
    }, 800);
  }, [eventId]);

  const handleVote = (candidateId: number) => {
    if (hasVoted) return;
    setSelectedCandidate(candidateId);
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    if (selectedCandidate === null) return;
    
    setVotingInProgress(true);
    setShowConfirmation(false);
    
    // Simulate API call for voting
    setTimeout(() => {
      setEvent(prev => {
        const updatedCandidates = prev.candidates.map((candidate: Candidate) => {
          if (candidate.id === selectedCandidate) {
            return { ...candidate, votes: candidate.votes + 1 };
          }
          return candidate;
        });
        return { ...prev, candidates: updatedCandidates, totalVotes: prev.totalVotes + 1 };
      });
      
      setVotingInProgress(false);
      setVoteSuccess(true);
      setHasVoted(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setVoteSuccess(false);
      }, 3000);
    }, 1500);
  };

  const calculateProgress = (start: string, end: string) => {
    const now = Date.now();
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const progress = ((now - startTime) / (endTime - startTime)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-green-500";
      case "upcoming": return "bg-blue-500";
      case "ended": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const toggleVoteResults = () => {
    setShowVoteResults(!showVoteResults);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-6 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Back button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage("events")}
        className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg ${
          darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
        } shadow-sm transition-all duration-200`}
      >
        <FaChevronLeft size={14} />
        <span>Back to Events</span>
      </motion.button>

      {/* Event header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} text-white`}>
                {event.status}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.category === "Technology" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" :
                event.category === "Music" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                event.category === "Sports" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : 
                "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}>
                {event.category}
              </div>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {event.title}
            </h1>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVoteResults}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white shadow-sm`}
            >
              <span className="font-medium">{showVoteResults ? "Hide Results" : "View Results"}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
              } shadow-sm`}
            >
              <FaShare className="text-blue-500" />
              <span className="font-medium">Share</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? "bg-pink-600 hover:bg-pink-500" : "bg-pink-500 hover:bg-pink-600"
              } text-white shadow-sm`}
            >
              <FaHeart />
              <span className="font-medium">Save</span>
            </motion.button>
          </div>
        </div>
        
        {/* Progress bar for ongoing events */}
        {event.status === "ongoing" && (
          <div className="mb-6 mt-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Event Progress
              </span>
              <span className="text-sm font-semibold text-blue-500">
                {Math.round(calculateProgress(event.start, event.end))}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress(event.start, event.end)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-blue-500 rounded-full" 
              />
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Event details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event info */}
          <EventInfo 
            event={event}
            calculateProgress={calculateProgress}
            formatEventDate={formatEventDate}
            darkMode={darkMode}
          />
          
          {/* Voting or Results section */}
          {!showVoteResults ? (
            <CandidateVoting 
              candidates={event.candidates}
              totalVotes={event.totalVotes}
              selectedCandidate={selectedCandidate}
              hasVoted={hasVoted}
              votingInProgress={votingInProgress}
              voteSuccess={voteSuccess}
              darkMode={darkMode}
              handleVote={handleVote}
            />
          ) : (
            <VoteResultComponent darkMode={darkMode} />
          )}
        </div>

        {/* Right column - Voting summary */}
        <VotingSummary 
          candidates={event.candidates}
          totalVotes={event.totalVotes}
          selectedCandidate={selectedCandidate}
          hasVoted={hasVoted}
          darkMode={darkMode}
        />
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {showConfirmation && (
          <VoteConfirmationModal
            selectedCandidate={selectedCandidate}
            candidates={event.candidates}
            darkMode={darkMode}
            onConfirm={confirmVote}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetail;