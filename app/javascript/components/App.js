import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration'
import Login from './pages/Login';
import Callback from './pages/Callback';
import JiraIssues from './pages/JiraIssues';
import Skills from './pages/Skills';
import Tickets from './pages/Tickets';
import UserProfile from './pages/UserProfile';
import MatchedSkills from './pages/MatchedSkills'

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;

  return (
    <>
      {isBrowser && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup/sign_up" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/jira_issues" element={<JiraIssues />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/users/:user_id/tickets" element={<Tickets />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/users/:user_id/matched_skills" element={<MatchedSkills />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
