import axios from 'axios'
import { toast } from 'react-hot-toast'

// Function to set default headers
const setDefaultHeaders = (token) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

// Function to handle API requests
const handleRequest = (method, url, data) => {
  return axios({
    method,
    url,
    data
  })
}

export const get = async (url) => {
  try {
    const response = await handleRequest('get', url)
    return response.data
  } catch (error) {
    toast(error.message)
  }
}

export const put = async (url, data) => {
  try {
    const response = await handleRequest('put', url, data)
    return response.data
  } catch (error) {
    toast(error.message)
  }
}

export const patch = async (url, data) => {
  try {
    const response = await handleRequest('patch', url, data)
    return response.data
  } catch (error) {
    toast(error.message)
  }
}

export const post = async (url, data) => {
  try {
    const response = await handleRequest('post', url, data)
    return response.data
  } catch (error) {
    toast(error.message)
  }
}

export const destroy = async (url, data) => {
  try {
    const response = await handleRequest('delete', url, data)
    return response.data
  } catch (error) {
    toast(error.message)
  }
}

export default setDefaultHeaders
