// App.tsx
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { EventComponent } from "./components/Event";
import { HomeComponent } from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import { VoteResultComponent } from "./components/VoteResult";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import EventDetail from "./components/EventDetail";
import axios from 'axios';
import { refreshAccessToken } from "./utils/auth";
import {jwtDecode as jwt_decode} from 'jwt-decode';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  
  // Function to navigate to event detail
  const navigateToEventDetail = (eventId: number) => {
    setSelectedEventId(eventId);
    setCurrentPage("event-detail");
  };

  // Add to your main App component or separate config
  axios.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('access_token');
  
    if (token) {
      const decoded = jwt_decode(token) as { exp: number };
      if (decoded.exp < Date.now() / 1000) {
        token = await refreshAccessToken();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Determine whether to show the navbar based on the current page
  const showNavbar = !["login", "register"].includes(currentPage);
  
  return (
    <div className="min-h-screen">
      {showNavbar && (
        <NavBar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <div className={showNavbar ? "pl-16" : ""}> {/* Match navbar width when applicable */}
        {currentPage === "dashboard" ? (
          <HomeComponent darkMode={darkMode} />
        ) : currentPage === "add-event" ? (
          <CreateEvent darkMode={darkMode} />
        ) : currentPage === "vote-results" ? (
          <VoteResultComponent darkMode={darkMode} />
        ) : currentPage === "login" ? (
          <Login darkMode={darkMode} setCurrentPage={setCurrentPage} />
        ) : currentPage === "register" ? (
          <Register darkMode={darkMode} setCurrentPage={setCurrentPage} />
        ) : currentPage === "profile" ? (
          <UserProfile darkMode={darkMode} />
        ) : currentPage === "event-detail" && selectedEventId !== null ? (
          <EventDetail 
            darkMode={darkMode} 
            eventId={selectedEventId} 
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <EventComponent 
            darkMode={darkMode} 
            navigateToEventDetail={navigateToEventDetail} 
          />
        )}
      </div>
    </div>
  );
};

export default App;