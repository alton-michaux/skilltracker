export const retrieveFromStorage = (item) => {
  return JSON.parse(localStorage.getItem(item))
}

export const sendToStorage = (data, type) => {
  if (type === 'user') {
    localStorage.setItem('userData', JSON.stringify(data?.user_data))
    localStorage.setItem('token', JSON.stringify(data?.token))
  }
  if (type === 'auth') {
    localStorage.setItem('authorized?', JSON.stringify(data))
  }
  if (type === 'tickets') {
    localStorage.setItem('tickets', JSON.stringify(data))
  }
}

export const removeFromStorage = () => {
  localStorage.clear()
}
