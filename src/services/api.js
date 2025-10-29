// src/services/api.js
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.post('/users/change-password', data),
};

// Wallet API calls
export const walletAPI = {
  getWallet: () => api.get('/wallet'),
  addFunds: (data) => api.post('/wallet/add-funds', data),
};

// Transaction API calls
export const transactionAPI = {
  sendMoney: (data) => api.post('/transactions/send', data),
  getTransactions: () => api.get('/transactions'),
  getTransaction: (id) => api.get(`/transactions/${id}`),
};

// Beneficiary API calls
export const beneficiaryAPI = {
  getAll: () => api.get('/beneficiaries'),
  create: (data) => api.post('/beneficiaries', data),
  getById: (id) => api.get(`/beneficiaries/${id}`),
  update: (id, data) => api.put(`/beneficiaries/${id}`, data),
  delete: (id) => api.delete(`/beneficiaries/${id}`),
};

// Admin API calls
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllWallets: () => api.get('/admin/wallets'),
  adjustWallet: (id, data) => api.post(`/admin/wallets/${id}/adjust`, data),
  getAllTransactions: () => api.get('/admin/transactions'),
  getStats: () => api.get('/admin/stats'),
};

export default api;