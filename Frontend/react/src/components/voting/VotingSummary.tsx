import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface Candidate {
  id: number;
  name: string;
  description: string;
  votes: number;
  image?: string;
}

interface VotingSummaryProps {
  candidates: Candidate[];
  totalVotes: number;
  selectedCandidate: number | null;
  hasVoted: boolean;
  darkMode: boolean;
}

const VotingSummary: React.FC<VotingSummaryProps> = ({ 
  candidates, 
  totalVotes, 
  selectedCandidate, 
  hasVoted, 
  darkMode 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-xl shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-100"} h-fit sticky top-4`}
    >
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Voting Summary
      </h2>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1.5">
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Total Votes</span>
            <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {totalVotes.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-3">
            {candidates.map((candidate: Candidate) => (
              <div key={candidate.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-700"} truncate pr-2`}>
                    {candidate.name}
                  </span>
                  <span className={`text-blue-500 font-medium`}>
                    {Math.round((candidate.votes / totalVotes) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((candidate.votes / totalVotes) * 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-blue-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} pt-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Your Vote</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              hasVoted 
                ? "bg-green-500 bg-opacity-20 text-green-500"
                : "bg-yellow-500 bg-opacity-20 text-yellow-500"
            }`}>
              {hasVoted ? "Voted" : "Not Voted"}
            </span>
          </div>
          
          {hasVoted ? (
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"} flex items-center gap-3`}>
              <div className={`p-1.5 rounded-full bg-blue-500 text-white`}>
                <FaCheckCircle size={12} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                You voted for: {candidates.find((c: Candidate) => c.id === selectedCandidate)?.name}
              </span>
            </div>
          ) : (
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"} text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Select a candidate above to cast your vote.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VotingSummary;