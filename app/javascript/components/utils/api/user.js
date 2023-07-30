import { URLFunctions } from "."

const userAPI = () => {
  const { get, post, destroy } = URLFunctions();

  const userLogin = () => get('/api/v1/login')
  const userLoginSubmit = (formData) => post('/api/v1/login', formData)
  const userLogout = (formData) => destroy('/api/v1/logout', formData)
  const userRegister = () => get('/api/v1/signup/sign_up')
  const userRegisterSubmit = (formData) => post('/api/v1/signup', formData)
  const cancelUserRegister = (formData) => get('/api/v1/signup/cancel', formData)

  return {
    userLogin,
    userLoginSubmit,
    userLogout,
    userRegister,
    userRegisterSubmit,
    cancelUserRegister
  }
}

export default userAPI;
