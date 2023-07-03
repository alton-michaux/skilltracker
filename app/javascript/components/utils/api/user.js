import {
  post, destroy, get,
} from './index';

export const userLogin = (formData) => get('/api/v1/login', formData)
export const userLogout = (formData) => destroy('/api/v1/logout', formData)
export const userRegister = (formData) => post('api/v1/signup/sign_up', formData)
export const cancelUserRegister = (formData) => get('api/v1/signup/cancel', formData)
