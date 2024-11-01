import axios from 'axios';

const ApiRequest = axios.create({
  baseURL: 'https://e-state-backend-z0s1.onrender.com', // Ensure this is the correct URL
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
