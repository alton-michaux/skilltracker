import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppContext } from './AppContext'
import { Toaster } from 'react-hot-toast'
import SkillTrackerNav from './elements/navbar'
import Home from './routes/Home'
import Registration from './routes/Registration'
import Login from './routes/Login'
import Callback from './routes/Callback'
import Skills from './routes/Skills'
import Tickets from './routes/Tickets'
import TicketShow from './routes/TicketShow'
import UserProfile from './routes/UserProfile'
import MatchedSkills from './routes/MatchedSkills'
import PrivateRoute from './routes/PrivateRoute'
import { URLFunctions } from './utils/api'
import Loader from './comps/Loader'
import { retrieveFromStorage } from './utils/local/storage'

const AppWrapper = () => {
  const { state, authRetrieve, tokenRetrieve, handleLogin, handleLogout, handleUser, handleJiraAuth } = useAppContext()

  useEffect(() => {
    const authorized = retrieveFromStorage('authorized?')

    authRetrieve()
    handleJiraAuth(authorized)
  }, [localStorage])

  useEffect(() => {
    tokenRetrieve()
  }, [])

  return (
    <Router>
      <SkillTrackerNav
        user={state.user}
        setUser={handleUser}
        onLogout={handleLogout}
        authString={state.authString}
        authorized={state.isAuthorized}
      ></SkillTrackerNav>
      <Toaster />
      <Loader />
      <Routes>
        <Route path="/home" element={
          <PrivateRoute
            isAuthenticated={state.isAuthenticated}
            onLogout={handleLogout}
          ></PrivateRoute>
        } />
        <Route path="/" element={<Home user={state.user} />} />
        <Route path="/api/v1/signup/sign_up" element={<Registration />} />
        <Route path="/api/v1/login" element={<Login setLogin={handleLogin} />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/api/v1/skills" element={<Skills />} />
        <Route path="/api/v1/users/:id/tickets" element={<Tickets />} />
        <Route path="/api/v1/users/:id/tickets/:id" element={<TicketShow />} />
        <Route path="/api/v1/users/:id/:name" element={<UserProfile user={state.user} />} />
        <Route path="/api/v1/users/:id/user_skills" element={<MatchedSkills user={state.user} />} />
        <Route element={<URLFunctions />}
        />
      </Routes>
    </Router >
  )
}

export default AppWrapper
