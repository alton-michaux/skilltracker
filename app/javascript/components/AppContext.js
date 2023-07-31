import React, { createContext, useContext, useReducer } from 'react'
import initialState from './initialState'
import StateHandler from './reducers/stateHandler'
import PropTypes from 'prop-types'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StateHandler, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

AppContext.defaultProps = {
  children: ''
}

AppContext.PropTypes = {
  children: PropTypes.string
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }
