import { motion } from "framer-motion";
import { 
  FaVoteYea,
  FaShieldAlt,
  FaChartBar,
  FaUsers,
  FaLock,
  FaClock,
  FaRegClock,
  FaCheckCircle,
  FaGlobe,
  FaMobileAlt,
  FaRegSmile,
  FaCalendarAlt,
  FaUserTie,
  FaUniversity,
  FaHandshake,
  FaBirthdayCake,
  FaAward
} from "react-icons/fa";
import React from "react";

export const HomeComponent = ({ darkMode }: { darkMode: boolean }) => {
  // Primary colors
  const primaryColor = darkMode ? "indigo-500" : "indigo-600";
  const primaryHoverColor = darkMode ? "indigo-400" : "indigo-700";
  const secondaryColor = darkMode ? "pink-500" : "pink-600";
  const secondaryHoverColor = darkMode ? "pink-400" : "pink-700";
  
  const stats = [
    { icon: <FaVoteYea />, value: "500K+", label: "Votes Processed" },
    { icon: <FaUsers />, value: "200K+", label: "Active Participants" },
    { icon: <FaCalendarAlt />, value: "50K+", label: "Events Created" },
    { icon: <FaCheckCircle />, value: "99.9%", label: "Accuracy Rate" },
  ];

  const features = [
    {
      title: "Create Events",
      desc: "Set up custom events with multiple voting options",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Real-time Results",
      desc: "Track voting progress with live analytics",
      icon: <FaChartBar />,
    },
    {
      title: "Secure Voting",
      desc: "Participant verification & vote protection",
      icon: <FaLock />,
    },
    {
      title: "Scheduled Events",
      desc: "Set precise start/end times for voting sessions",
      icon: <FaRegClock />,
    },
    {
      title: "Global Access",
      desc: "Multi-language support for worldwide events",
      icon: <FaGlobe />,
    },
    {
      title: "Mobile-friendly",
      desc: "Vote from any device, anywhere",
      icon: <FaMobileAlt />,
    },
  ];

  const eventTypes = [
    {
      title: "Corporate Elections",
      desc: "Board meetings, shareholder votes, and executive decisions",
      icon: <FaUserTie />,
      color: "blue"
    },
    {
      title: "Academic Polls",
      desc: "Student council elections, faculty voting, and class surveys",
      icon: <FaUniversity />,
      color: "green"
    },
    {
      title: "Community Decisions",
      desc: "Neighborhood initiatives, local governance, and public opinion",
      icon: <FaHandshake />,
      color: "green"
    },
    {
      title: "Social Events",
      desc: "Party planning, event choices, and group decisions",
      icon: <FaBirthdayCake />,
      color: "red"
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-white"} min-h-screen font-sans`}>
      {/* Hero Section */}
      <section className={`relative py-20 md:py-28 ${darkMode ? "bg-gray-800" : "bg-gray-50"} overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500"></div>
          <div className="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-pink-500"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-indigo-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className={`inline-block mb-6 p-3 rounded-full bg-opacity-10 bg-indigo-500`}>
              <div className={`p-3 rounded-full bg-${primaryColor} bg-opacity-20`}>
                <FaVoteYea className={`${darkMode ? "text-white" : "text-white"} text-4xl`} />
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Streamline Your <span className={`text-${primaryColor}`}>Event Voting</span> Experience
            </h1>
            
            <p className={`text-lg md:text-xl mb-10 mx-auto max-w-2xl ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Create engaging events, manage secure voting processes, and analyze real-time results—all in one powerful platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <FaCalendarAlt />,
                  title: "Create Events",
                  desc: "Customizable events for any occasion"
                },
                {
                  icon: <FaVoteYea />,
                  title: "Secure Voting",
                  desc: "Encrypted, tamper-proof ballots"
                },
                {
                  icon: <FaChartBar />,
                  title: "Live Results",
                  desc: "Real-time analytics & visualizations"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg border-b-4 border-${primaryColor}`}
                >
                  <div className={`text-2xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-3 rounded-lg font-semibold bg-indigo-600 hover:bg-${primaryHoverColor} ${darkMode ? "text-white" : "text-white"} shadow-md`}
              >
                Create Your Event
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-3 rounded-lg font-semibold border border-${primaryColor} hover:bg-opacity-10 hover:bg-${primaryColor} ${darkMode ? "text-white" : "text-${primaryColor}"}`}
              >
               Browse Event
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Perfect for <span className={`text-${secondaryColor}`}>Any Event</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Our platform adapts to your unique voting needs, whether it's a corporate decision, academic election, or social gathering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md text-center`}
              >
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-${type.color}-100 text-${type.color}-600`}>
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{type.title}</h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 md:py-24 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`inline-block py-1 px-3 rounded-full text-sm font-medium mb-3 ${darkMode ? `bg-${primaryColor} bg-opacity-20 text-white` : `bg-${primaryColor} bg-opacity-10 text-white`}`}
            >
              POWERFUL FEATURES
            </motion.span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Everything You Need for <span className={`text-${primaryColor}`}>Successful Events</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              From planning to execution to analysis, our comprehensive suite of tools makes event management and voting seamless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"} transition-colors shadow-md`}
              >
                <div className={`text-2xl mb-4 text-${primaryColor}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl text-center ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
              >
                <div className={`text-3xl mb-3 ${darkMode ? "text-white" : `text-${secondaryColor}`} mx-auto`}>
                  {stat.icon}
                </div>
                <h3 className={`text-3xl md:text-4xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto p-8 rounded-2xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
            <div className="flex items-center justify-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${primaryColor} bg-opacity-20`}>
                <FaShieldAlt className={`text-white text-xl`} />
              </div>
            </div>
            <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
              Enterprise-grade Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <FaLock className={`inline-block mr-2 text-${primaryColor}`} />
                  Voting Integrity
                </h3>
                <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <li>• End-to-end encryption</li>
                  <li>• Blockchain-style audit trails</li>
                  <li>• Voter anonymity protection</li>
                </ul>
              </div>
              <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <FaClock className={`inline-block mr-2 text-${primaryColor}`} />
                  Real-time Monitoring
                </h3>
                <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <li>• Live participation tracking</li>
                  <li>• Suspicious activity alerts</li>
                  <li>• Instant result calculation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`max-w-3xl mx-auto p-8 md:p-12 rounded-3xl text-center ${darkMode ? "bg-gradient-to-br from-indigo-900 to-gray-800" : "bg-gradient-to-br from-indigo-50 to-pink-50"} shadow-xl`}
          >
            <div className="inline-block mb-6">
              <FaAward className={`text-5xl ${darkMode ? "text-white" : `text-${secondaryColor}`}`} />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Ready to Transform Your Event Experience?
            </h2>
            <p className={`mb-8 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Join thousands of event organizers who trust our platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-4 rounded-lg font-semibold bg-${secondaryColor} hover:bg-${secondaryHoverColor} text-white shadow-md`}
              >
                Get Started - It's Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};