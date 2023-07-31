import initialState from '../initialState'

const StateHandler = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'authString':
      return {
        ...state,
        authString: action.payload
      }
    case 'user':
      return {
        ...state,
        user: action.payload
      }
    case 'isAuthenticated':
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case 'jiraClient':
      return {
        ...state,
        jiraClient: action.payload
      }
    case 'skills':
      return {
        ...state,
        skills: action.payload
      }
    case 'tickets':
      return {
        ...state,
        tickets: action.payload
      }
    default:
      return initialState
  }
}

export default StateHandler
