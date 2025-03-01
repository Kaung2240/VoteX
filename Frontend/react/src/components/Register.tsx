import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaCheck,
  FaArrowLeft,
  FaHome
} from "react-icons/fa";

interface RegisterProps {
  darkMode: boolean;
}

const Register: React.FC<RegisterProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Check password strength whenever password changes
  React.useEffect(() => {
    setPasswordStrength({
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password)
    });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!username || !email || !password || !confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    
    if (!termsAccepted) {
      setFormError("Please accept the terms and conditions");
      return;
    }

    // Check password strength
    const isPasswordStrong = Object.values(passwordStrength).filter(Boolean).length >= 4;
    if (!isPasswordStrong) {
      setFormError("Please use a stronger password");
      return;
    }
    
    // Reset error state
    setFormError("");
    
    // Show loading state
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password2: confirmPassword
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle backend validation errors
        let errorMsg = '';
        if (typeof data === 'object' && data !== null) {
          for (const [key, value] of Object.entries(data)) {
            errorMsg += `${key}: ${(value as string[]).join(' ')} `;
          }
        } else {
          errorMsg = 'Registration failed. Please try again.';
        }
        setFormError(errorMsg.trim());
        return;
      }
  
      // Registration successful - navigate to events
      navigate("/events");
    } catch (error) {
      setFormError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Calculate password strength percentage for progress bar
  const passwordStrengthPercentage = 
    Object.values(passwordStrength).filter(Boolean).length * 20;

  // Get color based on password strength
  const getPasswordStrengthColor = () => {
    if (passwordStrengthPercentage <= 20) return "bg-red-500";
    if (passwordStrengthPercentage <= 60) return "bg-yellow-500";
    return "bg-green-500";
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
            Create Your Account
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Join our platform and start creating events
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

        <motion.form variants={itemVariants} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`block w-full pl-10 pr-4 py-3 border ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email Address
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
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Password strength
                    </span>
                    <span className={`text-xs font-semibold ${
                      passwordStrengthPercentage <= 20 ? "text-red-500" :
                      passwordStrengthPercentage <= 60 ? "text-yellow-500" : "text-green-500"
                    }`}>
                      {passwordStrengthPercentage <= 20 ? "Weak" :
                       passwordStrengthPercentage <= 60 ? "Medium" : "Strong"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrengthPercentage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${getPasswordStrengthColor()}`}
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <span className={`mr-1.5 text-xs ${passwordStrength.length ? "text-green-500" : "text-gray-400"}`}>
                        {passwordStrength.length ? <FaCheck /> : "•"}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-1.5 text-xs ${passwordStrength.hasUpperCase ? "text-green-500" : "text-gray-400"}`}>
                        {passwordStrength.hasUpperCase ? <FaCheck /> : "•"}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-1.5 text-xs ${passwordStrength.hasLowerCase ? "text-green-500" : "text-gray-400"}`}>
                        {passwordStrength.hasLowerCase ? <FaCheck /> : "•"}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-1.5 text-xs ${passwordStrength.hasNumber ? "text-green-500" : "text-gray-400"}`}>
                        {passwordStrength.hasNumber ? <FaCheck /> : "•"}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        A number
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-1.5 text-xs ${passwordStrength.hasSpecial ? "text-green-500" : "text-gray-400"}`}>
                        {passwordStrength.hasSpecial ? <FaCheck /> : "•"}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    confirmPassword && password !== confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className={`h-4 w-4 rounded ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600"
                    : "bg-white border-gray-300 text-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                I agree to the{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </div>
        </motion.form>

       

        {/* Back to Home and Login */}
        <motion.div variants={itemVariants} className="flex justify-between mt-6">
          <Link 
            to="/"
            className={`font-medium text-blue-500 hover:text-blue-400 inline-flex items-center ${darkMode ? "text-blue-400 hover:text-blue-300" : ""}`}
          >
            <FaHome className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
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

export default Register;