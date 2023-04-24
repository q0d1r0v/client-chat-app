// imports
import axios from 'axios'

// base url
const baseURL = import.meta.env.VITE_APP_BASE_URL

// api
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((request: any) => {
  // token
  const token = localStorage.getItem('access_token')

  // operations
  if (!request.headers)
    request.headers = {}

  if (token)
    request.headers.Authorization = `Bearer ${token}`

  return request
})

api.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    location.reload()
  }
  return Promise.reject(error)
})

export default api
