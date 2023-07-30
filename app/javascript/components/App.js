import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import SkillTrackerNav from './elements/navbar'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Callback from './pages/Callback'
import JiraIssues from './pages/JiraIssues'
import Skills from './pages/Skills'
import Tickets from './pages/Tickets'
import UserProfile from './pages/UserProfile'
import MatchedSkills from './pages/MatchedSkills'
import PrivateRoute from './pages/PrivateRoute'
import { authorizeJiraSession } from './utils/api/jiraSessions'
import setDefaultHeaders from './utils/api'

const retrieveFromStorage = (item) => {
  return JSON.parse(localStorage.getItem(item))
}

const sendToStorage = (data) => {
  // Store the token in local storage and set isAuthenticated to true
  localStorage.setItem('token', JSON.stringify(data.token))
  localStorage.setItem('userData', JSON.stringify(data.user))
}

const removeFromStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
}

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window !== 'undefined'
  const [user, setUser] = useState({})
  const [authString, setAuthString] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user has an existing valid token in local storage on app load
    const token = retrieveFromStorage('token')
    if (token) {
      setDefaultHeaders(token)
      setIsAuthenticated(true)
      const userData = retrieveFromStorage('userData')
      if (userData) {
        handleUser(userData)
      }
    }
  }, [])

  const handleLogin = (data) => {
    sendToStorage(data)
    handleUser(data.user)
    setDefaultHeaders(data.token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    removeFromStorage()
    setDefaultHeaders()
    setIsAuthenticated(false)
    setUser({})
    setAuthString('')
  }

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
            onLogout={handleLogout}
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
  )
}

export default App
