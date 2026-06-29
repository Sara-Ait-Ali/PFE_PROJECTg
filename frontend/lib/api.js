// import axios from 'axios';



// const API = axios.create({
  
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
// });


// // Automatically attach token to every request
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const refresh = localStorage.getItem('refresh_token');
//       if (refresh) {
//         try {
//           const res = await axios.post(
//             'http://localhost:8080/api/auth/refresh/',
//             { refresh }
//           );
//           localStorage.setItem('access_token', res.data.access);
//           error.config.headers.Authorization = `Bearer ${res.data.access}`;
//           return API(error.config);
//         } catch (e) {
//           localStorage.clear();
//           window.location.href = '/login';
//         }
//       } else {
//         localStorage.clear();
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // ── AUTH ──────────────────────────────
// export const registerUser = (data) => API.post('/api/tmy/register/', data);
// export const loginUser = (data) => API.post('/api/auth/login/', data);
// export const refreshToken = (data) => API.post('/api/auth/refresh/', data);

// // ── TMY JOBS ──────────────────────────
// export const submitTMYJob = (data) => API.post('/api/tmy/submit/', data);
// export const getJobStatus = (jobId) => API.get(`/api/tmy/status/${jobId}/`);
// export const getAllJobs = () => API.get('/api/tmy/all/');
// export const downloadJob = (jobId) => API.get(`/api/tmy/download/${jobId}/`, { responseType: 'blob' });

// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
// });

// // 1. Attach token to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // 2. On 401 → redirect to login
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
// export const downloadJob = async (jobId) => {
//   const token = localStorage.getItem('access_token');
//   const response = await fetch(`http://localhost:8080/api/tmy/download/${jobId}/`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) throw new Error('Download failed');
//   return response;
// };

// // ── AUTH ──────────────────────────────
// export const registerUser = (data) => API.post('/api/tmy/register/', data);
// export const loginUser = (data) => API.post('/api/auth/login/', data);

// // ── TMY JOBS ──────────────────────────
// export const submitTMYJob = (data) => API.post('/api/tmy/submit/', data);
// export const getJobStatus = (jobId) => API.get(`/api/tmy/status/${jobId}/`);
// export const getAllJobs = () => API.get('/api/tmy/all/');
// export const downloadJob = (jobId) => API.get(`/api/tmy/download/${jobId}/`, { responseType: 'blob' });

import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

// 1. Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. On 401 → redirect to login
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── AUTH ──────────────────────────────
export const registerUser = (data) => API.post('/api/tmy/register/', data);
export const loginUser = (data) => API.post('/api/auth/login/', data);

// ── TMY JOBS ──────────────────────────
export const submitTMYJob = (data) => API.post('/api/tmy/submit/', data);
export const getJobStatus = (jobId) => API.get(`/api/tmy/status/${jobId}/`);
export const getAllJobs = () => API.get('/api/tmy/all/');

// ── DOWNLOAD (uses fetch, not axios, for binary files) ──
// export const downloadJob = async (jobId) => {
//   const token = localStorage.getItem('access_token');
//   const response = await fetch(`http://localhost:8080/api/tmy/download/${jobId}/`, {
//     headers: { 'Authorization': `Bearer ${token}` },
//   });
//   if (!response.ok) throw new Error('Download failed');
//   return response;
// };


export const downloadJob = async (jobId) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/tmy/download/${jobId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error('Download failed');
  const blob = await response.blob();
  return { data: blob };
};