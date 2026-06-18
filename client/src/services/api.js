import axios from 'axios'

const API = axios.create({
  baseURL: 'https://nivaranx.onrender.com/api'
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  return req
})

export const register = (data) => API.post('/auth/register', data)
export const login = (data) => API.post('/auth/login', data)
export const createComplaint = (data) => API.post('/complaints/create', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const getMyComplaints = () => API.get('/complaints/my')
export const sendMessage = (data) => API.post('/chat/message', data)
export const getNotifications = () => API.get('/notifications')
export const markNotificationsRead = () => API.put('/notifications/read')