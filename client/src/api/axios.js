import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle common tasks (like adding auth tokens if not using cookies)
// Since the project roadmap mentions httpOnly cookies, withCredentials: true is key.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear local auth state if needed
    }
    return Promise.reject(error);
  }
);

export default api;
