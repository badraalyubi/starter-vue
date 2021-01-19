// axios
import axios from 'axios'
import store from './store'
import https from 'https'

const baseURL = process.env.VUE_APP_BASE_URL
const axiosInstance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
  headers: {'Content-Type': 'multipart/form-data'}
})

// Request
axiosInstance.interceptors.request.use((config) => {
  console.log(config)
  config.headers['Content-Type'] = 'multipart/form-data'
  const token = localStorage.getItem('userToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return error
});

// Response
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status == 401) {
    window.location.reload()
    localStorage.removeItem('userToken')
    store.commit('auth/SET_USER', null);
  }
  return Promise.reject(error);
});

// Uploader
export const axiosUploaderInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'content-type': 'multipart/form-data'
  }
})

// Request
axiosUploaderInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosUploaderInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
})

export default axiosInstance
