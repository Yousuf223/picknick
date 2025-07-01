// src/services/api.js
import axios from 'axios';
import store from '../redux';
import { BASE_URL } from './WebService';

const api = axios.create({
  baseURL: BASE_URL, // Your base API URL
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().authReducer.userToken; // Get token from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const searchServices = async (params) => {
  try {
    const response = await api.get('/user/search', {
      params: {
        name: params.name || '',
        price: params.price || '',
        rating: params.rating || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const response = await api.get('/user/listings');
    return response.data;
  } catch (error) {
    console.error('Get services error:', error);
    throw error;
  }
};