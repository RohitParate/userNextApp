import axios from 'axios';
// import store from '../Redux/app/store';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: `https://localhost:7124`,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    // const token  = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
