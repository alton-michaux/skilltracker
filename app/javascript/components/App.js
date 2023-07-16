import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;
  const [user, setUser] = useState({});
  console.log("🚀 ~ file: App.js:18 ~ App ~ user:", user)

  return (
    <>
      {isBrowser && (
        <Router>
          <SkillTrackerNav
            user={user}
            setUser={setUser}
          ></SkillTrackerNav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/v1/signup/sign_up" element={<Registration />} />
            <Route path="/api/v1/login" element={<Login setUser={setUser} />} />
            <Route path="/api/v1/callback" element={<Callback />} />
            <Route path="/api/v1/jira_issues" element={<JiraIssues />} />
            <Route path="/api/v1/skills" element={<Skills />} />
            <Route path="/api/v1/users/:id/tickets" element={<Tickets user={user} />} />
            <Route path="/api/v1/users/:id/:name" element={<UserProfile user={user} />} />
            <Route path="/api/v1/users/:id/matched_skills" element={<MatchedSkills user={user} />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
