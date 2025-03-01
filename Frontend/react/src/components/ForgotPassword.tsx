import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

interface ForgotPasswordProps {
  darkMode: boolean;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setFormError("Please enter your email address");
      return;
    }

    setFormError("");
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.detail || "Failed to send reset email");
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      setFormError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex-1 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-xl ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-center text-3xl font-extrabold">
            Reset Password
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </motion.div>

        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
          >
            <p>{formError}</p>
          </motion.div>
        )}

        {isSuccess ? (
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <p>Reset instructions have been sent to your email address.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
            >
              Return to Login
            </motion.button>
          </motion.div>
        ) : (
          <motion.form variants={itemVariants} className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-4 py-3 border ${
                      darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isLoading 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-500 hover:bg-blue-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Back to Login */}
        <motion.div variants={itemVariants} className="flex justify-center mt-6">
          <Link 
            to="/login"
            className={`font-medium text-blue-500 hover:text-blue-400 inline-flex items-center ${darkMode ? "text-blue-400 hover:text-blue-300" : ""}`}
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;