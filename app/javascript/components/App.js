import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
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
import { authorizeJiraSession } from './utils/api/jiraSessions'

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;
  const [user, setUser] = useState({});
  const [authString, setAuthString] = useState("");

  async function authorizeJira() {
    authorizeJiraSession()
      .then(async (response) => {
        const data = await response.json()
        setAuthString(data.auth)
      }).catch((error) => {
        toast(error);
      })
  }

  const handleUser = (data) => {
    setUser(data)
    authorizeJira()
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
            <Route path="/" element={<Home user={user} />} />
            <Route path="/api/v1/signup/sign_up" element={<Registration />} />
            <Route path="/api/v1/login" element={<Login setUser={handleUser} />} />
            <Route path="/callback" element={<Callback />} />
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
