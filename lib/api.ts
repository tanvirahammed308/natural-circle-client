import axios from 'axios';
import { auth } from './firebase';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the Firebase ID token to every outgoing request
api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize backend error messages so callers can just read error.message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.request && !error.response ? 'Network error. Please check your connection.' : null) ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);
