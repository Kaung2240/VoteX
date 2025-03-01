// components/VoteResult.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaChartPie,
  FaUsers,
  FaUserCheck,
  FaCalendarCheck,
  FaClock,
  FaVoteYea,
  FaChartLine,
  FaInfoCircle,
  FaHistory,
  FaFilter,
  FaDownload,
  FaShare,
  FaRedo,
  FaRegClock
} from "react-icons/fa";

// Mock data interfaces
interface Candidate {
  id: number;
  name: string;
  votes: number;
  color: string;
  avatar?: string;
}

interface VoteHistory {
  id: number;
  voter: string;
  candidate: string;
  time: string;
  avatar?: string;
}

interface EventDetails {
  id: number;
  title: string;
  status: "ongoing" | "upcoming" | "ended";
  start: string;
  end: string;
  totalVotes: number;
  uniqueVoters: number;
  candidates: Candidate[];
  recentVotes: VoteHistory[];
  description?: string;
  created_by?: string;
}

export const VoteResultComponent = ({ darkMode }: { darkMode: boolean }) => {
  // Mock event data
  const [event, setEvent] = useState<EventDetails>({
    id: 1,
    title: "Company Board Election 2024",
    status: "ongoing",
    start: "2024-05-01 10:00",
    end: "2024-05-10 18:00",
    totalVotes: 1458,
    uniqueVoters: 1248,
    candidates: [
      { id: 1, name: "Sarah Johnson", votes: 624, color: "#3B82F6", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Michael Chen", votes: 412, color: "#10B981", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: 3, name: "Olivia Rodriguez", votes: 246, color: "#F59E0B", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: 4, name: "James Wilson", votes: 176, color: "#EF4444", avatar: "https://i.pravatar.cc/150?img=4" }
    ],
    recentVotes: [
      { id: 1, voter: "Alex Morgan", candidate: "Sarah Johnson", time: "2 minutes ago", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 2, voter: "Priya Patel", candidate: "Michael Chen", time: "5 minutes ago", avatar: "https://i.pravatar.cc/150?img=6" },
      { id: 3, voter: "David Kim", candidate: "Sarah Johnson", time: "8 minutes ago", avatar: "https://i.pravatar.cc/150?img=7" },
      { id: 4, voter: "Emma Wilson", candidate: "Olivia Rodriguez", time: "12 minutes ago", avatar: "https://i.pravatar.cc/150?img=8" },
      { id: 5, voter: "Juan Martinez", candidate: "Michael Chen", time: "15 minutes ago", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 6, voter: "Sophia Lee", candidate: "James Wilson", time: "18 minutes ago", avatar: "https://i.pravatar.cc/150?img=10" }
    ],
    description: "Annual election for the company board of directors. Each employee gets one vote to select their preferred candidate.",
    created_by: "HR Department"
  });

  // Toggle between viewing all candidates or just top performers
  const [viewAll, setViewAll] = useState(true);
  // Filter for recent votes
  const [voteFilter, setVoteFilter] = useState("all");

  // Calculate percentages for each candidate
  const totalVotes = event.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const candidates = event.candidates.map(candidate => ({
    ...candidate,
    percentage: Math.round((candidate.votes / totalVotes) * 100) || 0
  }));
  
  // Find winner (candidate with most votes)
  const winner = [...candidates].sort((a, b) => b.votes - a.votes)[0];

  // Filter candidates based on viewAll state
  const displayedCandidates = viewAll 
    ? candidates
    : candidates.slice(0, 3);

  // Filter recent votes
  const filteredVotes = voteFilter === "all"
    ? event.recentVotes
    : event.recentVotes.filter(vote => vote.candidate === voteFilter);

  // Calculate time remaining or time elapsed since end
  const calculateTimeStatus = () => {
    const now = new Date();
    const endTime = new Date(event.end);
    const startTime = new Date(event.start);
    
    if (event.status === "upcoming") {
      return { timeText: "Voting starts in", value: formatTimeRemaining(startTime.getTime() - now.getTime()) };
    } else if (event.status === "ongoing") {
      return { timeText: "Voting ends in", value: formatTimeRemaining(endTime.getTime() - now.getTime()) };
    } else {
      return { timeText: "Voting ended", value: formatTimeElapsed(now.getTime() - endTime.getTime()) };
    }
  };

  // Format time remaining in days, hours, minutes
  const formatTimeRemaining = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else {
      return `${minutes % 60}m ${seconds % 60}s`;
    }
  };

  // Format time elapsed since event ended
  const formatTimeElapsed = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const now = new Date().getTime();
    const startTime = new Date(event.start).getTime();
    const endTime = new Date(event.end).getTime();
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    
    return Math.max(0, Math.min(100, Math.floor((elapsed / totalDuration) * 100)));
  };

  // Simulating live updates with setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch updated data from an API here
      if (event.status === "ongoing") {
        // Simulate a new vote
        if (Math.random() > 0.7) {
          const candidateIndex = Math.floor(Math.random() * event.candidates.length);
          const updatedCandidates = [...event.candidates];
          updatedCandidates[candidateIndex].votes += 1;
          
          const newVoter = {
            id: event.recentVotes.length + 1,
            voter: `Anonymous Voter ${Math.floor(Math.random() * 1000)}`,
            candidate: updatedCandidates[candidateIndex].name,
            time: "Just now",
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
          };
          
          setEvent(prev => ({
            ...prev,
            totalVotes: prev.totalVotes + 1,
            uniqueVoters: prev.uniqueVoters + (Math.random() > 0.3 ? 1 : 0),
            candidates: updatedCandidates,
            recentVotes: [newVoter, ...prev.recentVotes.slice(0, 5)]
          }));
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [event]);

  const timeStatus = calculateTimeStatus();
  const progressPercentage = calculateProgress();

  return (
    <div className={`flex-1 px-2 py-8 lg:px-8 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div>
            <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {event.title}
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm lg:text-base`}>
              {event.description}
            </p>
          </div>
          
          <div className="flex mt-4 lg:mt-0 space-x-3">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"
            }`}>
              <FaShare /> Share
            </button>
            <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"
            }`}>
              <FaDownload /> Export
            </button>
            <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}>
              <FaRedo /> Refresh
            </button>
          </div>
        </div>
        
        {/* Status banner */}
        <div className={`rounded-lg p-4 mb-6 flex items-center justify-between ${
          event.status === "ongoing" 
            ? darkMode ? "bg-green-800/30" : "bg-green-100" 
            : event.status === "ended"
              ? darkMode ? "bg-red-800/30" : "bg-red-100"
              : darkMode ? "bg-blue-800/30" : "bg-blue-100"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              event.status === "ongoing" 
                ? darkMode ? "bg-green-700" : "bg-green-200" 
                : event.status === "ended"
                  ? darkMode ? "bg-red-700" : "bg-red-200"
                  : darkMode ? "bg-blue-700" : "bg-blue-200"
            }`}>
              {event.status === "ongoing" ? (
                <FaClock className={darkMode ? "text-green-300" : "text-green-700"} />
              ) : event.status === "ended" ? (
                <FaCalendarCheck className={darkMode ? "text-red-300" : "text-red-700"} />
              ) : (
                <FaRegClock className={darkMode ? "text-blue-300" : "text-blue-700"} />
              )}
            </div>
            <div>
              <p className={`font-medium ${
                event.status === "ongoing" 
                  ? darkMode ? "text-green-300" : "text-green-800" 
                  : event.status === "ended"
                    ? darkMode ? "text-red-300" : "text-red-800"
                    : darkMode ? "text-blue-300" : "text-blue-800"
              }`}>
                {event.status === "ongoing" ? "Voting in Progress" : event.status === "ended" ? "Voting Ended" : "Upcoming Vote"}
              </p>
              <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {timeStatus.timeText}: <span className="font-medium">{timeStatus.value}</span>
              </p>
            </div>
          </div>
          
          {event.status === "ongoing" && (
            <div className="hidden md:block w-1/3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-xs text-blue-500 font-medium">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main stats and chart */}
        <div className={`lg:col-span-2 ${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl shadow-lg p-6`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaChartPie className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span>Voting Results</span>
              {event.status === "ended" && (
                <span className={`ml-2 text-sm py-1 px-3 rounded-full ${
                  darkMode ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-800"
                }`}>
                  Final
                </span>
              )}
            </h2>
            <div className="flex items-center">
              <button 
                onClick={() => setViewAll(!viewAll)}
                className={`text-sm py-1 px-3 rounded-md ${
                  darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {viewAll ? "Show Top 3" : "Show All"}
              </button>
            </div>
          </div>
          
          {/* Doughnut chart visualization - in a real app, use a charting library */}
          <div className="flex items-center justify-center h-64 mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {event.totalVotes}
                </div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Total Votes
                </div>
              </div>
            </div>
            
            {/* This represents a simplified chart visualization */}
            <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-600 relative overflow-hidden">
              {displayedCandidates.map((candidate, index) => {
                const previousPercentages = displayedCandidates
                  .slice(0, index)
                  .reduce((sum, c) => sum + c.percentage, 0);
                
                return (
                  <div 
                    key={candidate.id}
                    className="absolute inset-0"
                    style={{
                      background: candidate.color,
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * previousPercentages / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * previousPercentages / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * (previousPercentages + candidate.percentage) / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * (previousPercentages + candidate.percentage) / 100)}%)`
                    }}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full ${darkMode ? "bg-gray-700" : "bg-white"}`}></div>
              </div>
            </div>
          </div>
          
          {/* Results table */}
          <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-50"} mb-4`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <th className="text-left p-3">Candidate</th>
                    <th className="text-right p-3">Votes</th>
                    <th className="text-right p-3">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCandidates.map((candidate, index) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        event.status === "ended" && candidate.id === winner.id 
                          ? darkMode ? "bg-yellow-900/20" : "bg-yellow-50"
                          : ""
                      } border-t ${
                        darkMode ? "border-gray-600" : "border-gray-200"
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: candidate.color }}
                          />
                          <div className="flex items-center gap-2">
                            {candidate.avatar && (
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <span>
                              {candidate.name}
                              {event.status === "ended" && candidate.id === winner.id && (
                                <FaTrophy className="inline-block ml-2 text-yellow-500" />
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right font-medium">{candidate.votes}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{
                                width: `${candidate.percentage}%`,
                                backgroundColor: candidate.color
                              }}
                            />
                          </div>
                          <span>{candidate.percentage}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Winner announcement for ended events */}
          {event.status === "ended" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border ${
                darkMode
                  ? "bg-yellow-900/20 border-yellow-700 text-yellow-300"
                  : "bg-yellow-50 border-yellow-200 text-yellow-800"
              } flex items-center gap-3`}
            >
              <FaTrophy className="text-yellow-500 text-2xl" />
              <div>
                <p className="font-medium">Winner: {winner.name}</p>
                <p className="text-sm">
                  Won with {winner.votes} votes ({winner.percentage}% of total)
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Stats and recent activity */}
        <div className="space-y-6">
          {/* Key stats cards */}
          <div className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl shadow-lg p-6`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaInfoCircle className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span>Key Statistics</span>
            </h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} flex items-center gap-4`}>
                <div className={`p-3 rounded-full ${
                  darkMode ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"
                }`}>
                  <FaVoteYea />
                </div>
                <div>
                  <div className="text-2xl font-bold">{event.totalVotes}</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Votes</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} flex items-center gap-4`}>
                <div className={`p-3 rounded-full ${
                  darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                }`}>
                  <FaUsers />
                </div>
                <div>
                  <div className="text-2xl font-bold">{event.uniqueVoters}</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Unique Voters</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} flex items-center gap-4`}>
                <div className={`p-3 rounded-full ${
                  darkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"
                }`}>
                  <FaChartLine />
                </div>
                <div>
                  <div className="text-2xl font-bold">{Math.round((event.uniqueVoters / 2000) * 100)}%</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Participation Rate</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent activity */}
          <div className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl shadow-lg p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaHistory className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                <span>Recent Activity</span>
              </h2>
              
              <div className="relative">
                <button className={`text-sm py-1 px-3 rounded-md flex items-center gap-1 ${
                  darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                }`}>
                  <FaFilter className="text-xs" />
                  Filter
                </button>
              </div>
            </div>
            
            {filteredVotes.length === 0 ? (
              <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                No recent activity
              </div>
            ) : (
              <div className="space-y-3">
                {filteredVotes.map((vote, index) => (
                  <motion.div
                    key={vote.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} flex items-center gap-3`}
                  >
                    {vote.avatar ? (
                      <img 
                        src={vote.avatar} 
                        alt={vote.voter}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-gray-600" : "bg-gray-200"
                      }`}>
                        <FaUserCheck />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {vote.voter}
                      </p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Voted for <span className="font-medium">{vote.candidate}</span>
                      </p>
                    </div>
                    <div className={`text-xs whitespace-nowrap ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {vote.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {event.status === "ongoing" && (
              <div className="mt-4 text-center">
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Live updating as new votes come in
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional insights section */}
      {event.status !== "upcoming" && (
        <div className={`mt-6 p-6 rounded-xl ${
          darkMode ? "bg-gray-700" : "bg-white"
        } shadow-lg`}>
          <h2 className="text-xl font-bold mb-4">Insights & Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium mb-2">Voter Turnout</h3>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {event.uniqueVoters} out of approximately 2000 eligible voters have participated, 
                representing a {Math.round((event.uniqueVoters / 2000) * 100)}% participation rate.
                {event.status === "ongoing" ? 
                  " Encouraging more participation could lead to a more representative result." : 
                  " This is a strong turnout for this type of election."}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium mb-2">Victory Margin</h3>
              {candidates.length > 1 && (
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  The leading candidate is ahead by {Math.abs(candidates[0].votes - candidates[1].votes)} votes 
                  ({Math.abs(candidates[0].percentage - candidates[1].percentage)}% difference).
                  {event.status === "ongoing" ? 
                    " The race is still competitive and could change as more votes come in." : 
                    " This represents a decisive victory."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteResultComponent;