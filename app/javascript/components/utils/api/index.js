import { useReducer } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import initialState from '../../initialState'
import StateHandler from '../../reducers/stateHandler'

// Function to set default headers
const setDefaultHeaders = (token) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export const URLFunctions = () => {
  const [state, dispatch] = useReducer(StateHandler, initialState)

  // Function to handle API requests
  const handleRequest = (method, url, data) => {
    return axios({
      method,
      url,
      data
    })
  }

  const get = async (url) => {
    try {
      const response = await handleRequest('get', url)
      dispatch({ type: 'loading' })
      if (response.data) {
        dispatch({ type: 'success' })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'error' })
      toast(error.message)
    }
  }

  const put = async (url, data) => {
    try {
      const response = await handleRequest('put', url, data)
      if (response.data) {
        dispatch({ type: 'loading' })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'error' })
      toast(error.message)
    }
  }

  const patch = async (url, data) => {
    try {
      const response = await handleRequest('patch', url, data)
      dispatch({ type: 'loading' })
      if (response.data) {
        dispatch({ type: 'success' })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'error' })
      toast(error.message)
    }
  }

  const post = async (url, data) => {
    try {
      const response = await handleRequest('post', url, data)
      dispatch({ type: 'loading' })
      if (response.data) {
        dispatch({ type: 'success' })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'error' })
      toast(error.message)
    }
  }

  const destroy = async (url, data) => {
    try {
      const response = await handleRequest('delete', url, data)
      dispatch({ type: 'loading' })
      if (response.data) {
        dispatch({ type: 'success' })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'error' })
      toast(error.message)
    }
  }

  // Return the URL methods as an object
  return {
    get,
    put,
    patch,
    post,
    destroy,
  };
}

export default setDefaultHeaders
