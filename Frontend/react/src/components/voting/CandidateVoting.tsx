import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVoteYea,
  FaCheck,
  FaCheckCircle,
  FaRegClock,
} from "react-icons/fa";

interface Candidate {
  id: number;
  name: string;
  description: string;
  votes: number;
  image?: string;
}

interface CandidateVotingProps {
  candidates: Candidate[];
  totalVotes: number;
  selectedCandidate: number | null;
  hasVoted: boolean;
  votingInProgress: boolean;
  voteSuccess: boolean;
  darkMode: boolean;
  handleVote: (candidateId: number) => void;
}

const CandidateVoting: React.FC<CandidateVotingProps> = ({
  candidates,
  totalVotes,
  selectedCandidate,
  hasVoted,
  votingInProgress,
  voteSuccess,
  darkMode,
  handleVote,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Vote for Your Favorite
        </h2>
        <div className="flex items-center gap-2">
          <FaVoteYea className="text-blue-500" />
          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {totalVotes.toLocaleString()} votes
          </span>
        </div>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {voteSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-5 p-3 bg-green-500 bg-opacity-10 border border-green-500 rounded-lg flex items-center gap-3"
          >
            <FaCheckCircle className="text-green-500" size={18} />
            <p className="text-green-500 font-medium">
              Your vote has been recorded! Thank you for participating.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voting in progress */}
      <AnimatePresence>
        {votingInProgress && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-5 p-3 bg-blue-500 bg-opacity-10 border border-blue-500 rounded-lg flex items-center gap-3"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-500 font-medium">
              Processing your vote...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {candidates.map((candidate: Candidate) => (
          <motion.div
            key={candidate.id}
            whileHover={{ scale: hasVoted ? 1 : 1.01 }}
            className={`p-4 border rounded-lg overflow-hidden ${
              darkMode 
                ? `border-gray-700 ${selectedCandidate === candidate.id ? "border-blue-500 bg-blue-500 bg-opacity-10" : ""}` 
                : `border-gray-200 ${selectedCandidate === candidate.id ? "border-blue-500 bg-blue-50" : ""}`
            } relative ${!hasVoted ? "cursor-pointer" : ""} transition-all duration-200`}
            onClick={() => !hasVoted && handleVote(candidate.id)}
          >
            <div className="flex">
              {candidate.image && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={candidate.image} 
                    alt={candidate.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {candidate.name}
                  {hasVoted && selectedCandidate === candidate.id && (
                    <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-xs font-medium bg-green-500 text-white">
                      <FaCheck size={10} className="mr-1" />
                      Your Vote
                    </span>
                  )}
                </h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>
                  {candidate.description}
                </p>
                <div className="flex items-center text-sm">
                  <div className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {candidate.votes.toLocaleString()} votes
                  </div>
                  <div className={`mx-2 text-lg ${darkMode ? "text-gray-600" : "text-gray-300"}`}>•</div>
                  <div className={`text-blue-500 font-medium`}>
                    {Math.round((candidate.votes / totalVotes) * 100)}%
                  </div>
                </div>
              </div>
              {!hasVoted && (
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${
                  selectedCandidate === candidate.id 
                    ? "border-blue-500 bg-blue-500" 
                    : darkMode ? "border-gray-600" : "border-gray-300"
                }`}>
                  {selectedCandidate === candidate.id && (
                    <FaCheck className="w-full h-full text-white p-0.5" />
                  )}
                </div>
              )}
            </div>
            
            {/* Vote progress bar */}
            <div className="mt-3 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((candidate.votes / totalVotes) * 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  selectedCandidate === candidate.id ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-500"
                }`} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      {!hasVoted && (
        <p className={`mt-5 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} flex items-center gap-2`}>
          <FaRegClock size={14} />
          <span>Voting ends when the event concludes. You can only vote once.</span>
        </p>
      )}
    </motion.div>
  );
};

export default CandidateVoting;