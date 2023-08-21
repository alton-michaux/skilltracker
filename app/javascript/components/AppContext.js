import React, { createContext, useContext, useReducer } from 'react'
import initialState from './initialState'
import StateHandler from './reducers/stateHandler'
import PropTypes from 'prop-types'
import jiraAPI from './utils/api/jira'
import setDefaultHeaders from './utils/api'
import { retrieveFromStorage, sendToStorage, removeFromStorage } from './utils/local/storage'

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StateHandler, initialState)

  const { authorizeJiraSession } = jiraAPI()

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

  const values = {
    state,
    authRetrieve,
    tokenRetrieve,
    handleLogin,
    handleLogout,
    handleUser,
    handleJiraAuth
  }

  return (
    <AppContext.Provider value={{ values }}>
      {children}
    </AppContext.Provider>
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
  children: PropTypes.string.isRequired
}
