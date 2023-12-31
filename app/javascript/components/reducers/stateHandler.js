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
    case 'isAuthorized':
      return {
        ...state,
        isAuthorized: action.payload
      }
    case 'skills':
      return {
        ...state,
        skills: action.payload
      }
    case 'matchedSkills':
      return {
        ...state,
        matchedSkills: action.payload
      }
    case 'tickets':
      return {
        ...state,
        tickets: action.payload
      }
    case 'results':
      return {
        ...state,
        tickets: action.payload
      }
    default:
      return initialState
  }
}

export default StateHandler
