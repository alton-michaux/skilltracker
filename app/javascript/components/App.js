import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
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
import jiraAPI from './utils/api/jira'
import setDefaultHeaders from './utils/api'
import { retrieveFromStorage, sendToStorage, removeFromStorage } from './utils/local/storage'
import StateHandler from './reducers/stateHandler'
import initialState from './initialState'
import { URLFunctions } from './utils/api'
import { AppProvider } from './AppContext'
import Loader from './comps/Loader'

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window !== 'undefined'
  const [state, dispatch] = useReducer(StateHandler, initialState)

  const { authorizeJiraSession } = jiraAPI()

  useEffect(() => {
    const client = localStorage.getItem('jiraClient')
    if (client) {
      dispatch({ type: 'jiraClient', payload: JSON.parse(client) })
    }
  }, [localStorage])

  useEffect(() => {
    // Check if the user has an existing valid token in local storage on app load
    const token = retrieveFromStorage('token')
    if (token) {
      setDefaultHeaders(token)
      dispatch({ type: 'isAuthenticated', payload: true })
      const userData = retrieveFromStorage('userData')
      if (userData) {
        handleUser(userData)
      }
    }
  }, [])

  const handleLogin = (data) => {
    sendToStorage(data, 'user')
    handleUser(data.user_data)
    setDefaultHeaders(data.token)
    dispatch({ type: 'isAuthenticated', payload: true })
  }

  const handleLogout = () => {
    removeFromStorage()
    setDefaultHeaders()
    dispatch({ type: 'default' })
  }

  const handleUser = async (data) => {
    dispatch({ type: 'user', payload: data })
    const authNav = await authorizeJiraSession()
    dispatch({ type: 'authString', payload: authNav.auth })
  }

  return (
    <>
      {isBrowser && (
        <AppProvider>
          <Router>
            <SkillTrackerNav
              user={state.user}
              setUser={handleUser}
              onLogout={handleLogout}
              authString={state.authString}
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
              <Route path="/api/v1/jira_issues" element={<JiraIssues />} />
              <Route path="/api/v1/skills" element={<Skills />} />
              <Route path="/api/v1/users/:id/tickets" element={<Tickets user={state.user} />} />
              <Route path="/api/v1/users/:id/:name" element={<UserProfile user={state.user} />} />
              <Route path="/api/v1/users/:id/matched_skills" element={<MatchedSkills user={state.user} />} />
              <Route element={<URLFunctions />}
              />
            </Routes>
          </Router >
        </AppProvider>
      )}
    </>
  )
}

export default App
