import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import { Toaster } from "react-hot-toast";
import SkillTrackerNav from './elements/navbar';
import Home from './pages/Home';
import Registration from './pages/Registration'
import Login from './pages/Login';
import Callback from './pages/Callback';
import JiraIssues from './pages/JiraIssues';
import Skills from './pages/Skills';
import Tickets from './pages/Tickets';
import UserProfile from './pages/UserProfile';
import MatchedSkills from './pages/MatchedSkills'
import PrivateRoute from './pages/PrivateRoute';
import { authorizeJiraSession } from './utils/api/jiraSessions'

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;
  const [user, setUser] = useState({});
  const [authString, setAuthString] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has an existing valid token in local storage on app load
    const tokenString = localStorage.getItem('token')
    if (tokenString) {
      const token = JSON.parse(tokenString)
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (data) => {
    // Store the token in local storage and set isAuthenticated to true
    localStorage.setItem('token', JSON.stringify(data.token));
    Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setIsAuthenticated(true);
    handleUser(data.user)
  };

  const handleLogout = () => {
    // Clear the token from local storage and set isAuthenticated to false
    localStorage.removeItem('token');
    Axios.defaults.headers.common['Authorization'] = undefined;
    setIsAuthenticated(false);
  };

  const handleUser = async (data) => {
    setUser(data)
    const authNav = await authorizeJiraSession()
    setAuthString(authNav.auth)
  }

  return (
    <>
      {isBrowser && (
        <Router>
          <SkillTrackerNav
            user={user}
            setUser={handleUser}
            authString={authString}
          ></SkillTrackerNav>
          <Toaster />
          <Routes>
            <Route path="/home" element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              ></PrivateRoute>
            } />
            <Route path="/" element={<Home user={user} />} />
            <Route path="/api/v1/signup/sign_up" element={<Registration />} />
            <Route path="/api/v1/login" element={<Login setLogin={handleLogin} />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/api/v1/jira_issues" element={<JiraIssues />} />
            <Route path="/api/v1/skills" element={<Skills />} />
            <Route path="/api/v1/users/:id/tickets" element={<Tickets user={user} />} />
            <Route path="/api/v1/users/:id/:name" element={<UserProfile user={user} />} />
            <Route path="/api/v1/users/:id/matched_skills" element={<MatchedSkills user={user} />} />
          </Routes>
        </Router >
      )}
    </>
  );
};

export default App;
