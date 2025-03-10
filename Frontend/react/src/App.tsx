// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Auth routes (no navbar) */}
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          
          {/* Routes with navbar */}
          <Route
            path="/*"
            element={
              <>
                <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className="pl-16">
                  <Routes>
                    <Route path="/" element={<HomeComponent darkMode={darkMode} />} />
                    <Route path="/events" element={<EventComponent darkMode={darkMode} />} />
                    <Route path="/add-event" element={<CreateEvent darkMode={darkMode} />} />
                    <Route path="/vote-results" element={<VoteResultComponent darkMode={darkMode} />} />
                    <Route path="/profile" element={<UserProfile darkMode={darkMode} />} />
                    <Route path="/event/:eventId" element={<EventDetail darkMode={darkMode} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;