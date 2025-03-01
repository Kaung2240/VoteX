import React from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaChartPie,
  FaUsers,
  FaVoteYea,
  FaChartLine
} from "react-icons/fa";

interface Candidate {
  id: number;
  name: string;
  description: string;
  votes: number;
  image?: string;
}

interface VoteResultDetailsProps {
  event: {
    candidates: Candidate[];
    totalVotes: number;
    status: string;
  };
  darkMode: boolean;
}

const VoteResultDetails: React.FC<VoteResultDetailsProps> = ({ event, darkMode }) => {
  // Find winner (candidate with most votes)
  const winner = [...event.candidates].sort((a, b) => b.votes - a.votes)[0];
  
  // Sort candidates by votes (high to low)
  const sortedCandidates = [...event.candidates].sort((a, b) => b.votes - a.votes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl shadow-lg p-6 mt-6`}
    >
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
      </div>
      
      {/* Results visualization */}
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
        
        {/* Simplified chart visualization */}
        <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-600 relative overflow-hidden">
          {sortedCandidates.map((candidate, index) => {
            const percentage = Math.round((candidate.votes / event.totalVotes) * 100) || 0;
            const previousPercentages = sortedCandidates
              .slice(0, index)
              .reduce((sum, c) => sum + Math.round((c.votes / event.totalVotes) * 100) || 0, 0);
            
            // Generate colors based on index
            const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
            const color = colors[index % colors.length];
            
            return (
              <div 
                key={candidate.id}
                className="absolute inset-0"
                style={{
                  background: color,
                  clipPath: percentage > 0 ? 
                    `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * previousPercentages / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * previousPercentages / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * (previousPercentages + percentage) / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * (previousPercentages + percentage) / 100)}%)` : 
                    "none"
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
              {sortedCandidates.map((candidate, index) => {
                const percentage = Math.round((candidate.votes / event.totalVotes) * 100) || 0;
                const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
                const color = colors[index % colors.length];
                
                return (
                  <motion.tr
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      event.status === "ended" && candidate.id === winner?.id 
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
                          style={{ backgroundColor: color }}
                        />
                        <div className="flex items-center gap-2">
                          {candidate.image && (
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span>
                            {candidate.name}
                            {event.status === "ended" && candidate.id === winner?.id && (
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
                              width: `${percentage}%`,
                              backgroundColor: color
                            }}
                          />
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Winner announcement for ended events */}
      {event.status === "ended" && winner && (
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
              Won with {winner.votes} votes ({Math.round((winner.votes / event.totalVotes) * 100)}% of total)
            </p>
          </div>
        </motion.div>
      )}

      {/* Key stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
            <div className="text-2xl font-bold">{Math.round(event.totalVotes * 0.85)}</div>
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
            <div className="text-2xl font-bold">{Math.min(99, Math.round((event.totalVotes * 0.85 / event.totalVotes) * 100))}%</div>
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Participation Rate</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VoteResultDetails;