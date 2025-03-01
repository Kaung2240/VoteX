import React from "react";
import { motion } from "framer-motion";

interface Candidate {
  id: number;
  name: string;
  description: string;
  votes: number;
  image?: string;
}

interface VoteConfirmationModalProps {
  selectedCandidate: number | null;
  candidates: Candidate[];
  darkMode: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  selectedCandidate,
  candidates,
  darkMode,
  onConfirm,
  onCancel,
}) => {
  const candidate = candidates.find((c) => c.id === selectedCandidate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } rounded-xl shadow-xl max-w-md w-full p-6`}
      >
        <h3 className="text-xl font-bold mb-3">Confirm Your Vote</h3>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
          You're about to vote for:
        </p>
        <div className={`p-4 mb-5 rounded-lg ${
          darkMode ? "bg-gray-700" : "bg-blue-50"
        }`}>
          <div className="font-bold text-lg">
            {candidate?.name}
          </div>
          <div className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {candidate?.description}
          </div>
        </div>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mb-5`}>
          This action cannot be undone. You can only vote once per event.
        </p>
        <div className="flex gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Confirm Vote
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default VoteConfirmationModal;