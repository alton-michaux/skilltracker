import React, { createContext, useContext, useReducer } from 'react'
import initialState from './initialState'
import StateHandler from './reducers/stateHandler'
import PropTypes from 'prop-types'
import jiraAPI from './utils/api/jira'
import setDefaultHeaders from './utils/api'
import { toast, Toaster } from 'react-hot-toast'
import { retrieveFromStorage, sendToStorage, removeFromStorage } from './utils/local/storage'
import userAPI from './utils/api/user'
import SkillAPI from './utils/api/skills'

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StateHandler, initialState)

  const { authorizeJiraSession } = jiraAPI()

  const { userLogout } = userAPI()

  const { getJiraIssues } = jiraAPI()

  const { getSkills, matchedSkills } = SkillAPI()

  const authRetrieve = () => {
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
  }

  const tokenRetrieve = () => {
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
  }

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

  const handleJiraAuth = (success) => {
    dispatch({ type: 'isAuthorized', payload: success })
  }

  const fetchMatchedSkills = async (id) => {
    try {
      await matchedSkills(id)
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await getSkills()
      if (response) {
        console.log('🚀 ~ file: navbar.js:36 ~ fetchSkills ~ response:', state)
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchIssues = async (id) => {
    try {
      const response = await getJiraIssues()
      if (response) {
        console.log('🚀 ~ file: AppContext.js:97 ~ fetchIssues ~ response:', response)
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const removeUser = async (onLogout) => {
    try {
      await userLogout()
      onLogout()
      toast('Logged out successfully')
    } catch (error) {
      toast(error.message)
    }
  }

  const values = {
    state,
    authRetrieve,
    tokenRetrieve,
    handleLogin,
    handleLogout,
    handleUser,
    handleJiraAuth,
    fetchMatchedSkills,
    fetchSkills,
    fetchIssues,
    removeUser
  }

  return (
    <>
      <AppContext.Provider value={{ values }}>
        {children}
      </AppContext.Provider>
      <Toaster/>
    </>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context?.values) {
    return context.values
  } else {
    throw new Error('You are trying to access context too far up the component tree')
  }
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired
}
