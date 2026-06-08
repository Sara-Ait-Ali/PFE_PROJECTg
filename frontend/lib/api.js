import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── AUTH ──────────────────────────────
export const registerUser = (data) => API.post('/api/tmy/register/', data);
export const loginUser = (data) => API.post('/api/auth/login/', data);
export const refreshToken = (data) => API.post('/api/auth/refresh/', data);

// ── TMY JOBS ──────────────────────────
export const submitTMYJob = (data) => API.post('/api/tmy/submit/', data);
export const getJobStatus = (jobId) => API.get(`/api/tmy/status/${jobId}/`);
export const getAllJobs = () => API.get('/api/tmy/all/');

