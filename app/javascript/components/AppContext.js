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

  const { userLogout, userLoginSubmit, userRegisterSubmit } = userAPI()

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
    setDefaultHeaders(data.token)
    handleUser(data.user_data)
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

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Create an object to store the form data
    const data = {}

    for (const [name, value] of formData.entries()) {
      data[name] = value
    }

    // Include the CSRF token in the form data
    data.authenticity_token = document.querySelector('meta[name="csrf-token"]').content
    setDefaultHeaders(data.token)
    try {
      const response = await userLoginSubmit(data)
      if (response) {
        const id = response.user_data.id
        const name = response.user_data.full_name

        handleLogin(response)

        return { id, name }
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Create an object to store the form data
    const data = {}

    for (const [name, value] of formData.entries()) {
      data[name] = value
    }

    // Include the CSRF token in the form data
    data.authenticity_token = document.querySelector('meta[name="csrf-token"]').content

    try {
      await userRegisterSubmit(data)
    } catch (response) {
      toast(response.error)
    }
  }

  const fetchMatchedSkills = async (id) => {
    try {
      const response = await matchedSkills(id)
      if (response) {
        dispatch({ type: 'matchedSkills', payload: response })
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchSkills = async (query) => {
    try {
      const response = await getSkills(query)
      if (response) {
        dispatch({ type: 'skills', payload: response.skills })
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchIssues = async (id) => {
    const tickets = retrieveFromStorage('tickets')
    if (tickets) {
      dispatch({ type: 'tickets', payload: tickets })
    } else {
      try {
        const response = await getJiraIssues()
        if (!response.error) {
          sendToStorage(response, 'tickets')
          dispatch({ type: 'tickets', payload: response })
        } else {
          toast(response.error)
        }
      } catch (error) {
        toast(error.message)
      }
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

  const handleLoader = (flag) => {
    if (flag === 'loading') {
      dispatch({ type: 'loading' })
    }
    if (flag === 'success') {
      dispatch({ type: 'success' })
    }
    if (flag === 'error') {
      dispatch({ type: 'error' })
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
    handleLoginSubmit,
    handleRegistrationSubmit,
    fetchMatchedSkills,
    fetchSkills,
    fetchIssues,
    removeUser,
    handleLoader
  }

  return (
    <>
      <AppContext.Provider value={{ values }}>
        {children}
      </AppContext.Provider>
      <Toaster />
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
