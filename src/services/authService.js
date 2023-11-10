// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

export const signUp = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const signIn = (userData) => {
  return axios.post(`${API_URL}/signin`, userData);
};
