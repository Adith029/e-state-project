import axios from 'axios';

const ApiRequest = axios.create({
  baseURL: 'http://localhost:8081', // Ensure this is the correct URL
  headers: {
    'Content-Type': 'application/json'
  }
});

ApiRequest.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default ApiRequest;
