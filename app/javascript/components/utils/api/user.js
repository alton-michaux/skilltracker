import {
  post, destroy, get,
} from './index';

export const userLogin = () => get('/api/v1/login')
export const userLogout = (formData) => destroy('/api/v1/logout', formData)
export const userRegister = () => get('/api/v1/signup/sign_up')
export const userRegisterSubmit = (formData) => post('/api/v1/signup', formData)
export const cancelUserRegister = (formData) => get('/api/v1/signup/cancel', formData)
